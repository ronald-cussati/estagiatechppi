"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ============================================================
// IMPORTAÇÕES OBRIGATÓRIAS
// ============================================================
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORTA = 3000;
// ============================================================
// MIDDLEWARES
// ============================================================
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(process.cwd(), '../client')));
// ============================================================
// BANCO DE DADOS EM MEMÓRIA
// ============================================================
const vagas = [
    {
        id: '1718100000001',
        titulo: 'Desenvolvedor Frontend Jr',
        empresa: 'Bradesco',
        area: 'Frontend',
        dataCriacao: new Date().toISOString()
    }
];
const candidaturas = [];
// ============================================================
// ROTAS DE VAGAS (ENDPOINTS)
// ============================================================
// GET /vagas: Retorna a lista completa com a contagem de candidatos
app.get('/vagas', (req, res) => {
    const vagasComCandidatos = vagas.map(vaga => {
        const totalCandidatos = candidaturas.filter(c => c.idVaga === vaga.id).length;
        return { ...vaga, candidatos: totalCandidatos };
    });
    res.status(200).json(vagasComCandidatos);
});
// POST /vagas: Recebe uma nova vaga
app.post('/vagas', (req, res) => {
    const { titulo, empresa, area } = req.body;
    if (!titulo || !empresa || !area || titulo.trim() === '' || empresa.trim() === '') {
        res.status(400).json({ erro: "Faltam campos obrigatórios ou preenchidos apenas com espaços" });
        return;
    }
    const novaVaga = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        empresa: empresa.trim(),
        area: String(area),
        dataCriacao: new Date().toISOString()
    };
    vagas.push(novaVaga);
    res.status(201).json(novaVaga);
});
// DELETE /vagas/:id: Deletar uma vaga
app.delete('/vagas/:id', (req, res) => {
    const { id } = req.params;
    const index = vagas.findIndex((v) => v.id === id);
    if (index === -1) {
        res.status(404).json({ erro: 'Vaga não encontrada' });
        return;
    }
    vagas.splice(index, 1);
    res.status(200).json({ mensagem: 'Vaga apagada com sucesso' });
});
// PUT /vagas/:id: Editar uma vaga
app.put('/vagas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, empresa, area } = req.body;
    const index = vagas.findIndex((v) => v.id === id);
    if (index === -1) {
        res.status(404).json({ erro: 'Vaga não encontrada' });
        return;
    }
    if (!titulo || !empresa || !area || titulo.trim() === '' || empresa.trim() === '') {
        res.status(400).json({ erro: "Faltam campos obrigatórios ou preenchidos apenas com espaços" });
        return;
    }
    vagas[index] = {
        ...vagas[index],
        titulo: titulo.trim(),
        empresa: empresa.trim(),
        area: String(area)
    };
    res.status(200).json(vagas[index]);
});
// ============================================================
// ROTAS DE CANDIDATURAS
// ============================================================
// POST /candidaturas: Recebe uma nova candidatura rica
app.post('/candidaturas', (req, res) => {
    const { idVaga, nomeCandidato, idade, curso, periodo, email, github, linkedin } = req.body;
    // Validação dos campos obrigatórios
    if (!idVaga || !nomeCandidato || !idade || !curso || !periodo || !email || !github) {
        res.status(400).json({ erro: 'Apenas Linkedin é opcional, preencha os demais!' });
        return;
    }
    const novaCandidatura = {
        id: Date.now().toString(),
        idVaga: String(idVaga),
        nomeCandidato: nomeCandidato.trim(),
        idade: String(idade).trim(),
        curso: curso.trim(),
        periodo: periodo.trim(),
        email: email.trim(),
        github: github.trim(),
        linkedin: linkedin ? linkedin.trim() : '',
        status: 'Em análise',
        dataCandidatura: new Date().toISOString()
    };
    candidaturas.push(novaCandidatura);
    res.status(201).json(novaCandidatura);
});
// GET /candidaturas/:idVaga: Lista quem se candidatou na vaga específica
app.get('/candidaturas/:idVaga', (req, res) => {
    const { idVaga } = req.params;
    const inscritos = candidaturas.filter(c => c.idVaga === idVaga);
    res.status(200).json(inscritos);
});
// PUT /candidaturas/:id/status: Atualiza status do candidato (Moderação da Empresa)
app.put('/candidaturas/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (status !== 'Em análise' && status !== 'Aprovado' && status !== 'Rejeitado') {
        res.status(400).json({ erro: "Status inválido" });
        return;
    }
    const index = candidaturas.findIndex(c => c.id === id);
    if (index === -1) {
        res.status(404).json({ erro: "Candidatura não encontrada" });
        return;
    }
    candidaturas[index].status = status;
    res.status(200).json(candidaturas[index]);
});
// ============================================================
// INICIALIZAÇÃO
// ============================================================
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}...`);
});
