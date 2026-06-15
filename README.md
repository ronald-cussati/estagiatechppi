# EstagiaTech - Plataforma de Vagas de Estágio

Este projeto foi desenvolvido como trabalho avaliativo para a disciplina de **Programação para a Internet (PPI)**. O **EstagiaTech** é um sistema projetado para conectar alunos em busca de estágio e empresas oferecendo oportunidades no mercado.

**Acesso Rápido:**
- **Ambiente de Produção (Vercel):** [https://estagiatechppi.vercel.app](https://estagiatechppi.vercel.app)

---

## Proposta do Projeto

O sistema simula o fluxo completo de publicação de vagas e candidaturas em uma interface centralizada:

- **Área do Estudante**: Visualiza as vagas disponíveis no mural, filtra oportunidades por área de atuação (Frontend, Backend, Data, Mobile) e realiza inscrições preenchendo o formulário de candidatura.
- **Área da Empresa**: Permite a publicação de novas vagas, edição ou remoção das oportunidades ativas e gestão dos estudantes inscritos, podendo alterar o status das candidaturas para Aprovado ou Rejeitado.

## Tecnologias Utilizadas

Para garantir a leveza e atender aos requisitos da disciplina, a stack tecnológica escolhida foi:

- **Front-end**: HTML5, CSS3 responsivo (com abordagem Mobile-First) e TypeScript.
- **Back-end**: API RESTful construída com Node.js e Express.
- **Banco de Dados**: Simulado em memória (array objects) no lado do servidor para viabilizar testes e avaliações rápidas.

---

## Como executar o projeto localmente

Para rodar a aplicação em seu ambiente de desenvolvimento local, siga os passos abaixo:

1. Certifique-se de ter o **Node.js** instalado na máquina.
2. Abra seu terminal na raiz do projeto e navegue para a pasta do servidor:
   ```bash
   cd server
   ```
3. Instale todas as dependências necessárias:
   ```bash
   npm install
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
5. A aplicação estará rodando. Acesse em seu navegador: `http://localhost:3000`

---

## Equipe de Desenvolvimento

- **Ronald Cussati Cesar da Fonseca**
- **Leonarda Candal de Carvalho**

**Disciplina:** Programação para a Internet (PPI)
**Professor:** Edgard da Cunha Pontes
