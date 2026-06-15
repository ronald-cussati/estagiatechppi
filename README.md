# EstagiaTech — A Ponte entre Talentos e Empresas 🚀

Projeto avaliativo para a disciplina de **Programação para a Internet (PPI)**. O **EstagiaTech** é uma plataforma focada em simplificar a conexão entre estudantes em busca da primeira oportunidade e empresas com vagas abertas, tudo num formato leve, direto e profissional.

---

## 🎯 Proposta do Projeto
O objetivo do sistema é criar um painel dinâmico que sirva a dois perfis:
*   **Estudante**: Pode visualizar as vagas disponíveis, filtrá-las por área (Frontend, Backend, etc) e se candidatar preenchendo um formulário detalhado (Nome, Idade, Período, Links, etc).
*   **Empresa**: Pode publicar novas vagas, editar as existentes, excluí-las permanentemente e avaliar o quadro de candidatos. A empresa tem o poder de **Aprovar** ou **Rejeitar** inscrições recebidas.

## 🛠️ Tecnologias Utilizadas (A Stack)
Este projeto respeita os princípios básicos de Web Development Vanilla para fins acadêmicos.
*   **Front-end**: HTML5 semântico, CSS3 (com custom properties e flexbox) e TypeScript/JavaScript nativo para manipulação pesada do DOM (Sem bibliotecas externas).
*   **Back-end**: Node.js com Express para criação da API REST.
*   **Armazenamento**: Estrutura em memória usando Arrays (Vetores), para simular a rapidez de um banco de dados e facilitar a avaliação do fluxo de dados.

## 🎨 Funcionalidades de Destaque
- **Manipulação Avançada de DOM**: Geração dinâmica de tabelas e listas (Cards) baseadas no consumo (Fetch) da API.
- **Design Inteligente (UI/UX)**: Animações de Efeito Shimmer, modais nativos HTML5 (`<dialog>`) em vez de alertas antiquados, e um sistema de notificação via Promises no Front-end.
- **RESTful API**: Sistema fechado de rotas com métodos `GET` (Ler), `POST` (Criar), `PUT` (Atualizar) e `DELETE` (Deletar) funcionando em total sincronia com a interface.

---

## ⚙️ Como rodar o projeto localmente

Como o sistema é composto por Front-end (Client) e Back-end (Server) integrados, siga os passos abaixo:

1. **Requisitos**: É necessário ter o [Node.js](https://nodejs.org/en/) instalado no seu computador.
2. Abra o terminal (ou prompt de comando) e entre na pasta `/server` do projeto.
3. Instale as dependências digitando:
   ```bash
   npm install
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
5. O console exibirá a mensagem `Servidor rodando em http://localhost:3000`.
6. Abra seu navegador de preferência e acesse [http://localhost:3000](http://localhost:3000). A plataforma estará ativa!

---

## 💡 Sobre os Integrantes
Desenvolvido por **[Seu Nome Aqui]** e equipe.
Projeto guiado pelas regras estritas de negócios SaaS: "Impacto, UX e Simplicidade que funciona".
