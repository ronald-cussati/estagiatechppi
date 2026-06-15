# EstagiaTech — Plataforma de Vagas de Estágio

Este projeto foi desenvolvido como trabalho avaliativo para a disciplina de **Programação para a Internet (PPI)**. O **EstagiaTech** é um sistema simplificado desenvolvido para conectar alunos em busca de estágio e empresas oferecendo vagas.

* **Link da aplicação na Vercel:** https://estagiatech.vercel.app

---

## Proposta do Projeto

O sistema simula o fluxo básico de contratação em duas interfaces no mesmo painel:
* **Área do Estudante**: Visualiza as vagas disponíveis no painel principal, filtra as vagas por área (Frontend, Backend, Data, Mobile) e realiza a inscrição preenchendo o formulário de candidatura.
* **Área da Empresa**: Permite que empresas publiquem novas vagas, editem ou removam vagas existentes e visualizem os estudantes inscritos em cada vaga, podendo alterar o status da candidatura para "Aprovado" ou "Rejeitado".

## Tecnologias Utilizadas

Para manter o foco no aprendizado de desenvolvimento web básico, o projeto utiliza:
* **Front-end**: HTML5, CSS3 (com design responsivo Mobile-First) e TypeScript compilado para JavaScript para manipulação do DOM e comunicação com a API.
* **Back-end**: Node.js com Express para subir a API REST.
* **Banco de Dados**: Simulado em memória usando vetores (arrays) no Node.js para facilitar a execução local do trabalho.

---

## Como executar o projeto localmente

Para rodar o projeto no seu computador, siga o passo a passo:

1. **Requisitos**: Tenha o Node.js instalado.
2. Abra seu terminal na pasta `/server` do projeto.
3. Instale as dependências executando:
   ```bash
   npm install
   ```
4. Inicie o servidor local:
   ```bash
   npm run dev
   ```
5. Acesse no seu navegador: http://localhost:3000

---

## Integrantes do Grupo
* Ronald Cussati Cesar da Fonseca
* Leonarda Candal de Carvalho
