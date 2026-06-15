"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ============================================================
// IMPORTAÇÕES OBRIGATÓRIAS
// ============================================================
// express: Framework base para criar o servidor web
// Request, Response: Tipos do Express para garantir tipagem do TypeScript
const express_1 = __importDefault(require("express"));
// cors: Permite que nosso frontend (na porta 5500 ou live server) converse com o backend
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Inicializando o aplicativo Express
const app = (0, express_1.default)();
const PORTA = 3000;
// ============================================================
// MIDDLEWARES (Configurações do Servidor)
// ============================================================
app.use((0, cors_1.default)()); // Libera o acesso da API para outros domínios
app.use(express_1.default.json()); // Ensina o Express a entender corpo de requisições no formato JSON
// Configuração para servir o front-end estático da pasta /client
app.use(express_1.default.static(path_1.default.join(process.cwd(), '../client')));
// ============================================================
// BANCO DE DADOS EM MEMÓRIA
// ============================================================
// Array que simula o nosso banco de dados temporário.
// Quando o servidor é reiniciado, ele volta ao estado original.
const vagas = [
    {
        id: '1718100000001',
        titulo: 'Desenvolvedor Frontend Jr',
        empresa: 'Stefanini',
        area: 'Frontend',
        dataCriacao: new Date().toISOString()
    }
];
// ============================================================
// ROTAS DA API (ENDPOINTS)
// ============================================================
// Rota 1: GET /vagas
// Objetivo: Retornar a lista completa de vagas cadastradas.
app.get('/vagas', (req, res) => {
    // Status 200: OK. Retorna o array convertido em JSON.
    res.status(200).json(vagas);
});
// Rota 2: POST /vagas
// Objetivo: Receber uma nova vaga, validar e adicioná-la ao array.
app.post('/vagas', (req, res) => {
    const { titulo, empresa, area } = req.body;
    // Validação: Verifica se o frontend mandou todos os dados exigidos
    if (!titulo || !empresa || !area) {
        // Status 400: Bad Request (Erro do cliente).
        res.status(400).json({ erro: "Faltam campos obrigatórios (titulo, empresa ou area)" });
        return;
    }
    // Montagem do novo objeto respeitando a interface IVaga
    const novaVaga = {
        id: Date.now().toString(), // Usamos o Timestamp atual como ID único
        titulo: String(titulo),
        empresa: String(empresa),
        area: String(area),
        dataCriacao: new Date().toISOString() // Salva a data atual
    };
    // Adiciona a nova vaga no "banco de dados"
    vagas.push(novaVaga);
    // Status 201: Created. Retorna a vaga criada como confirmação.
    res.status(201).json(novaVaga);
});
// Rota 3: DELETE /vagas/:id
// Objetivo: Deletar uma vaga específica através do seu ID.
app.delete('/vagas/:id', (req, res) => {
    const { id } = req.params;
    const index = vagas.findIndex((v) => v.id === id);
    if (index === -1) {
        res.status(404).json({ erro: 'Vaga não encontrada' });
        return;
    }
    // Remove 1 elemento do array na posição index
    vagas.splice(index, 1);
    res.status(200).json({ mensagem: 'Vaga apagada com sucesso' });
});
// Rota 4: PUT /vagas/:id
// Objetivo: Atualizar os dados de uma vaga existente.
app.put('/vagas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, empresa, area } = req.body;
    const index = vagas.findIndex((v) => v.id === id);
    if (index === -1) {
        res.status(404).json({ erro: 'Vaga não encontrada' });
        return;
    }
    if (!titulo || !empresa || !area) {
        res.status(400).json({ erro: "Faltam campos obrigatórios (titulo, empresa ou area)" });
        return;
    }
    // Atualiza os dados preservando o ID e a Data de Criação
    vagas[index] = {
        ...vagas[index],
        titulo: String(titulo),
        empresa: String(empresa),
        area: String(area)
    };
    res.status(200).json(vagas[index]);
});
// ============================================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================================
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}...`);
});
