import express, { Request, Response } from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto'; // Função nativa do Node para criar IDs complexos únicos

// Instanciamos o aplicativo Express (O Framework que cria nossa API REST)
const app = express();
const port = 3000;

// =========================================================================
// MIDDLEWARES (Filtros pelos quais toda requisição passa antes das rotas)
// =========================================================================

// CORS: Permite que o front-end (index.html em um endereço/porta X) 
// acesse nosso back-end (localhost:3000). Se tirar isso, o Google Chrome bloqueia por segurança.
app.use(cors());

// Permite que nosso Express entenda quando o React/Front envia objetos no formato JSON.
app.use(express.json());

import path from 'path';
// Serve a pasta 'client' (nosso Front-end) na raiz do servidor. 
// Assim, ao entrar no localhost:3000, o Node entrega o index.html em vez de dar "Cannot GET /"
app.use(express.static(path.join(__dirname, '../../client')));



// =========================================================================
// BANCO DE DADOS EM MEMÓRIA (VETORES)
// Como o professor quer algo simples, usamos Arrays para simular Tabelas.
// =========================================================================

// "Tabela" de Vagas
interface IVaga {
  id: string;
  titulo: string;
  empresa: string;
  area: string;
  dataCriacao: string;
}
let vagas: IVaga[] = [];

// "Tabela" de Candidaturas
interface ICandidatura {
  id: string;
  idVaga: string;
  nomeCandidato: string;
  idade: string;
  curso: string;
  periodo: string;
  email: string;
  github: string;
  linkedin: string;
  status: 'Em análise' | 'Aprovado' | 'Rejeitado'; // Status controlados
  dataCandidatura: string;
}
let candidaturas: ICandidatura[] = [];


// =========================================================================
// ROTAS DE VAGAS (CRUD: Create, Read, Update, Delete)
// =========================================================================

// 1. READ (Ler): Retorna todas as vagas e calcula quantos alunos se inscreveram nela.
app.get('/vagas', (req: Request, res: Response) => {
  // Vamos varrer cada vaga, e ir no array 'candidaturas' ver quantas
  // tem o 'idVaga' igual ao dessa vaga. Isso se chama junção (join) de pobre.
  const vagasComCount = vagas.map(vaga => {
    const inscritos = candidaturas.filter(c => c.idVaga === vaga.id).length;
    return { ...vaga, candidatos: inscritos }; // Retorna o objeto vaga + atributo novo
  });
  
  res.json(vagasComCount); // Manda o vetor pronto em formato JSON
});

// 2. CREATE (Criar): Postar uma nova vaga
app.post('/vagas', (req: Request, res: Response) => {
  // Puxamos do Body (corpo) da requisição que veio da internet
  const { titulo, empresa, area } = req.body;

  // Validação: .trim() tira os espaços. Se estiver vazio (""), corta a função aqui.
  if (!titulo || !titulo.trim() || !empresa || !empresa.trim()) {
    return res.status(400).json({ error: 'Título e empresa não podem estar vazios.' });
  }

  const novaVaga: IVaga = {
    id: randomUUID(), // Exemplo: "5b8f6c3-1d2a..."
    titulo: titulo.trim(),
    empresa: empresa.trim(),
    area,
    dataCriacao: new Date().toISOString() // Pega a data e hora do relógio atômico em texto
  };

  vagas.push(novaVaga); // "Insert into Vagas". Adicionamos no Array!
  res.status(201).json(novaVaga); // 201 significa "Criado com sucesso" (Created)
});

// 3. UPDATE (Atualizar): Edita uma vaga usando um ID dinâmico na URL
app.put('/vagas/:id', (req: Request, res: Response) => {
  const { id } = req.params; // Puxa o "id" que veio pela URL
  const { titulo, empresa, area } = req.body; // Puxa os dados que vieram pelo formulário

  if (!titulo || !titulo.trim() || !empresa || !empresa.trim()) {
    return res.status(400).json({ error: 'Título e empresa não podem estar vazios.' });
  }

  // ".findIndex" descobre em qual gaveta (índice: 0, 1, 2) do Array aquela vaga mora.
  const index = vagas.findIndex((vaga) => vaga.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Vaga não localizada no sistema.' }); // 404 (Not Found)
  }

  // Edita fisicamente os atributos no array
  vagas[index].titulo = titulo.trim();
  vagas[index].empresa = empresa.trim();
  vagas[index].area = area;

  res.json(vagas[index]);
});

// 4. DELETE (Apagar): Remove a vaga e apaga todos os currículos de estudantes ligados à ela.
app.delete('/vagas/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Atualiza o array inteiro 'vagas', mas com uma regra: 
  // SÓ MANTÉM QUEM TIVER O ID DIFERENTE DO ID EXCLUIDO.
  vagas = vagas.filter((vaga) => vaga.id !== id);
  
  // Apaga as candidaturas ligadas (Cascata)
  candidaturas = candidaturas.filter((cand) => cand.idVaga !== id);

  res.status(204).send(); // 204 = (No Content - Feito, e não há mensagem pra devolver)
});

// =========================================================================
// ROTAS DA TELA DE "ESTUDANTES" / "MODERAÇÃO"
// =========================================================================

// 5. RECEBER CANDIDATURA (POST) - Quando o estudante aperta Enviar
app.post('/candidaturas', (req: Request, res: Response) => {
  const payload = req.body;

  const novaCandidatura: ICandidatura = {
    id: randomUUID(),
    idVaga: payload.idVaga,
    nomeCandidato: payload.nomeCandidato,
    idade: payload.idade,
    curso: payload.curso,
    periodo: payload.periodo,
    email: payload.email,
    github: payload.github,
    linkedin: payload.linkedin,
    status: 'Em análise', // Toda vaga sempre começa Em Análise!
    dataCandidatura: new Date().toISOString()
  };

  candidaturas.push(novaCandidatura);
  res.status(201).json(novaCandidatura);
});

// 6. MOSTRAR OS INSCRITOS PARA A EMPRESA (GET)
// A empresa abre a vaga X. A URL envia o idVagaX. Nós respondemos todos os inscritos.
app.get('/candidaturas/:idVaga', (req: Request, res: Response) => {
  const { idVaga } = req.params;
  
  // Filtra as inscrições para mandar apenas as que baterem com o ID solicitado.
  const alunosInscritos = candidaturas.filter(c => c.idVaga === idVaga);
  res.json(alunosInscritos);
});

// 7. APROVAR OU REJEITAR CANDIDATO (PUT)
// Pega o ID da "Candidatura" específica e muda o status.
app.put('/candidaturas/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const index = candidaturas.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Candidatura não encontrada' });
  }

  // Troca 'Em análise' por 'Aprovado' ou 'Rejeitado' (Conforme chegou pelo body)
  candidaturas[index].status = status;
  res.json(candidaturas[index]);
});


// =========================================================================
// START: INICIALIZANDO O SERVIDOR E ALGUNS DADOS FALSOS
// =========================================================================
app.listen(port, () => {
  // Injetamos um dado "semente" no banco falso (Array) pra ele nunca nascer vazio e dar pra apresentar legal!
  if (vagas.length === 0) {
    vagas.push({
      id: randomUUID(),
      titulo: 'Desenvolvedor Frontend Júnior',
      empresa: 'NuBank',
      area: 'Frontend',
      dataCriacao: new Date().toISOString()
    });
    vagas.push({
      id: randomUUID(),
      titulo: 'Analista de Dados',
      empresa: 'Itaú Unibanco',
      area: 'Data',
      dataCriacao: new Date().toISOString()
    });
  }
  
  // Isso aqui printa no terminal preto quando roda:
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Pressione CTRL+C para desligar o backend.`);
});
