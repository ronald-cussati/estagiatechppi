# EstagiaTech — A Ponte entre Talentos e Empresas 🚀

Projeto Full Stack desenvolvido para a disciplina de **Programação para Internet (MLPII - Avaliação Processual 1º Bimestre)** da Faculdade Multivix.

### 👥 Integrantes do Grupo
* **Leonarda Candal de Carvalho**
* **Ronald Cussati Cesar da Fonseca**

### 🎯 Tema Escolhido
**EstagiaTech:** Plataforma de cadastro, listagem e candidatura de vagas de estágio em Tecnologia da Informação (TI).
A aplicação foi projetada para conectar estudantes em busca de oportunidades com empresas contratantes, simulando duas visualizações (Perfis) distintas em uma Single Page Application.

### 🛠️ Tecnologias Utilizadas
* **Front-end:** HTML5 Semântico, CSS3 Moderno (Glassmorphism, Flexbox, CSS Grid) e TypeScript (DOM nativo, Fetch API).
* **Back-end:** Node.js, Express.js, CORS e TypeScript.
* **Dados:** Persistência em memória estruturada por Interfaces (`IVaga`, `ICandidatura`).

---

## 🚀 Como Rodar o Projeto

Para testar a aplicação localmente, certifique-se de ter o **Node.js** (v18+) instalado na sua máquina.

1. Clone o repositório ou baixe os arquivos fonte.
2. Abra um terminal e navegue até a pasta `server`:
   ```bash
   cd server
   ```
3. Instale as dependências obrigatórias:
   ```bash
   npm install
   ```
4. Inicie o servidor da API e Front-end:
   ```bash
   npm run dev
   ```
   *(O terminal exibirá a mensagem: `Servidor rodando na porta 3000...`)*

5. Com o servidor rodando, abra o arquivo `client/index.html` em seu navegador favorito ou utilize uma extensão como o *Live Server*.
6. Alterne entre os perfis no topo da página para testar as rotas de Publicação (Empresa) e Candidatura (Estudante).

---

## 📚 Referências Bibliográficas

* ADRIANO, Thiago da Silva. **Guia prático de TypeScript**. (Capítulos 5 e 11).
* HAVERBEKE, Marijn. **Eloquent JavaScript**. (Capítulos 13 e 20).
* FOWLER, Martin. **Refatoração**. (Princípios de nomes semânticos e funções puras).
