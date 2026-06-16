<div align="center">
  <img src="https://i.imgur.com/xFoM7nV.png" alt="Logo do EstagiaTech" width="120" />

# EstagiaTech

**A ponte entre estudantes e oportunidades de estágio**

Projeto desenvolvido para a disciplina de **Programação para a Internet (PPI)** do curso de **Sistemas de Informação** da **Faculdade Multivix**.

</div>

***

## Sobre o projeto

O **EstagiaTech** é uma aplicação Full Stack desenvolvida com **Node.js**, **Express** e **TypeScript**, com o objetivo de conectar estudantes em busca de estágio a empresas que desejam divulgar oportunidades.

A aplicação permite:

- Cadastro de vagas de estágio.
- Listagem de oportunidades disponíveis.
- Cadastro de candidaturas.
- Visualização e gerenciamento dos candidatos.
- Aprovação ou rejeição de candidatos pelas empresas.

O projeto foi desenvolvido com foco na integração entre **Front-End** e **Back-End**, utilizando requisições HTTP e troca de dados em formato **JSON**.

## Demonstração

- **Ambiente de produção:** [https://estagiatech.vercel.app/](https://estagiatech.vercel.app/)

## Arquitetura da aplicação

A aplicação segue uma arquitetura **cliente-servidor**:

```text
┌─────────────────────┐
│      Front-End      │
│   HTML + CSS + TS   │
└──────────┬──────────┘
           │
           │ Fetch API
           │
           ▼
┌─────────────────────┐
│      Back-End       │
│  Node.js + Express  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Dados em Memória  │
│   Arrays e Objetos  │
└─────────────────────┘
```

## Fluxo de funcionamento

1. O usuário preenche um formulário no navegador.
2. O TypeScript captura o evento de envio.
3. Uma requisição HTTP é enviada utilizando `fetch`.
4. O servidor Express recebe os dados.
5. Os dados são processados e armazenados em memória.
6. A API retorna uma resposta em **JSON**.
7. O Front-End atualiza a interface automaticamente.

## Funcionalidades

### Área do estudante

- Visualização de vagas disponíveis.
- Filtro por especialidade.
- Cadastro de candidatura.
- Consulta das oportunidades abertas.

### Área da empresa

- Cadastro de novas vagas.
- Gerenciamento das vagas cadastradas.
- Visualização dos candidatos.
- Aprovação e rejeição de candidaturas.

## Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Front-End | HTML5, CSS3, TypeScript |
| Back-End | Node.js, Express.js |
| Linguagem | TypeScript |
| Comunicação | Fetch API + JSON |
| Versionamento | Git e GitHub |
| Deploy | Vercel |

## Conceitos aplicados

Durante o desenvolvimento, foram aplicados conceitos estudados na disciplina:

- Programação para Internet.
- Arquitetura Cliente-Servidor.
- APIs REST.
- Métodos HTTP (`GET` e `POST`).
- TypeScript e tipagem estática.
- Interfaces.
- Manipulação do DOM.
- Programação assíncrona com `async/await`.
- Consumo de API com `fetch`.
- Express.js.
- JSON.

## Estrutura do projeto

```text
estagiatechppi/
│
├── client/
│   ├── html/
│   ├── css/
│   └── typescript/
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── interfaces/
│   └── app.ts
│
└── README.md
```

## Como executar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/ronald-cussati/estagiatechppi.git
```

### 2. Acessar a pasta do projeto

```bash
cd estagiatechppi
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o servidor

```bash
npm run dev
```

### 5. Acessar a aplicação

```text
http://localhost:3000
```

## Equipe

- Ronald Cussati Cesar da Fonseca
- Leonarda Candal de Carvalho

**Curso:** Sistemas de Informação  
**Instituição:** Faculdade Multivix  
**Disciplina:** Programação para a Internet (PPI)  
**Professor:** Edgard da Cunha Pontes

## Referências

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- ADRIANO, Thiago da Silva. *Guia Prático de TypeScript*.
- HAVERBEKE, Marijn. *Eloquent JavaScript*.
- FOWLER, Martin. *Refatoração*.
