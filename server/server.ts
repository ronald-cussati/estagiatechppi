// ============================================================
// IMPORTAÇÕES OBRIGATÓRIAS
// ============================================================
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORTA = 3000;

// ============================================================
// CONTRATO DE DADOS — Interfaces TypeScript
// ============================================================
export interface IVaga {
  id: string;
  titulo: string;
  empresa: string;
  area: string;
  dataCriacao: string;
}

export interface ICandidatura {
  id: string;
  idVaga: string; // Relacionamento com a Vaga
  nomeCandidato: string;
  dataCandidatura: string;
}

// ============================================================
// MIDDLEWARES
// ============================================================
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), '../client')));

// ============================================================
// BANCO DE DADOS EM MEMÓRIA
// ============================================================
const vagas: IVaga[] = [
  {
    id: '1718100000001',
    titulo: 'Desenvolvedor Frontend Jr',
    empresa: 'Stefanini',
    area: 'Frontend',
    dataCriacao: new Date().toISOString()
  }
];

// Simulando a tabela de Candidaturas do Banco
const candidaturas: ICandidatura[] = [];

// ============================================================
// ROTAS DE VAGAS (ENDPOINTS)
// ============================================================

// GET /vagas: Retorna a lista completa com a contagem de candidatos
app.get('/vagas', (req: Request, res: Response) => {
  // Vamos enviar as vagas com uma contagem de quantos se candidataram (opcional mas agrega valor)
  const vagasComCandidatos = vagas.map(vaga => {
    const totalCandidatos = candidaturas.filter(c => c.idVaga === vaga.id).length;
    return { ...vaga, candidatos: totalCandidatos };
  });

  res.status(200).json(vagasComCandidatos);
});

// POST /vagas: Recebe uma nova vaga
app.post('/vagas', (req: Request, res: Response) => {
  const { titulo, empresa, area } = req.body;

  // Validação mais rigorosa usando .trim() para evitar vagas em branco (Ex: "   ")
  if (!titulo || !empresa || !area || titulo.trim() === '' || empresa.trim() === '') {
    res.status(400).json({ erro: "Faltam campos obrigatórios ou preenchidos apenas com espaços" });
    return;
  }

  const novaVaga: IVaga = {
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
app.delete('/vagas/:id', (req: Request, res: Response) => {
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
app.put('/vagas/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, empresa, area } = req.body;

  const index = vagas.findIndex((v) => v.id === id);

  if (index === -1) {
    res.status(404).json({ erro: 'Vaga não encontrada' });
    return;
  }

  // Mesma correção do bug de strings vazias
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

// POST /candidaturas: Recebe uma nova candidatura para uma vaga
app.post('/candidaturas', (req: Request, res: Response) => {
  const { idVaga, nomeCandidato } = req.body;

  if (!idVaga || !nomeCandidato || nomeCandidato.trim() === '') {
    res.status(400).json({ erro: 'Id da Vaga e Nome do Candidato são obrigatórios' });
    return;
  }

  const novaCandidatura: ICandidatura = {
    id: Date.now().toString(),
    idVaga: String(idVaga),
    nomeCandidato: nomeCandidato.trim(),
    dataCandidatura: new Date().toISOString()
  };

  candidaturas.push(novaCandidatura);
  res.status(201).json(novaCandidatura);
});

// GET /candidaturas/:idVaga: Lista quem se candidatou na vaga específica
app.get('/candidaturas/:idVaga', (req: Request, res: Response) => {
  const { idVaga } = req.params;
  const inscritos = candidaturas.filter(c => c.idVaga === idVaga);
  res.status(200).json(inscritos);
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}...`);
});
