<div align="center">
  <img src="https://i.imgur.com/xFoM7nV.png" alt="EstagiaTech Logo" width="120" />
  <h1>EstagiaTech</h1>
  <p><strong>A ponte definitiva entre Talentos Acadêmicos e Oportunidades de Estágio</strong></p>

  [![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](#)
</div>

<br />

> Projeto desenvolvido como trabalho avaliativo para a disciplina de **Programação para a Internet (PPI)**. O **EstagiaTech** visa centralizar e facilitar o processo de captação de estagiários pelas empresas, oferecendo uma interface fluida e de fácil usabilidade para os estudantes.

---

## Links Rápidos

- **Ambiente de Produção:** [estagiatechppi.vercel.app](https://estagiatechppi.vercel.app)
- **Documentação de Uso:** Consulte as seções abaixo para rodar localmente.

---

## Painel Duplo (Estudante e Empresa)

O sistema foi arquitetado para simular duas jornadas complementares em um único ambiente:

### Área do Estudante
- **Mural de Oportunidades:** Visualização de todas as vagas ativas no sistema.
- **Filtro de Especialidade:** Organização rápida por Frontend, Backend, Data ou Mobile.
- **Inscrição Simplificada:** Preenchimento de formulário rápido de candidatura, exigindo apenas os dados mais essenciais para a vaga.

### Área da Empresa
- **Gestão de Vagas:** Criação de novos anúncios de estágio.
- **Painel de Moderação:** Interface de listagem de todos os currículos/dados recebidos.
- **Fluxo de Aprovação:** Ferramenta interativa de aprovação e rejeição de candidatos.

---

## Tecnologias e Arquitetura

O sistema priorizou a leveza e a responsividade (Mobile-First):

| Camada | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Front-end** | HTML5, CSS3, TypeScript | Interface fluida, sem frameworks complexos, focada em manipulação pura do DOM e usabilidade nativa. |
| **Back-end** | Node.js, Express | API RESTful rápida e escalável para gerenciar a persistência das vagas e inscrições. |
| **Persistência** | Memória Local | Estrutura simulada via Arrays e Objetos no servidor, para facilidade de testes didáticos. |

---

## Como executar o projeto localmente

Deseja rodar ou contribuir com o projeto em sua máquina? O processo é muito simples:

**1.** Certifique-se de ter o **Node.js** instalado na máquina.  
**2.** Abra o terminal na raiz do projeto e navegue para a pasta principal do servidor:
```bash
cd server
```

**3.** Instale todas as dependências necessárias de forma automatizada:
```bash
npm install
```

**4.** Inicialize o servidor local em modo de desenvolvimento:
```bash
npm run dev
```

**5.** A API e o portal Front-end estarão disponíveis. Acesse em seu navegador:
> [http://localhost:3000](http://localhost:3000)
---

## Equipe de Desenvolvimento

O projeto foi inteiramente arquitetado e concebido pelos alunos abaixo para fins acadêmicos:

- **Ronald Cussati Cesar da Fonseca**
- **Leonarda Candal de Carvalho**

**Instituição:** Faculdade Multivix
**Curso:** Sistemas de Informação
**Disciplina:** Programação para a Internet (PPI)  
**Professor Responsável:** Edgard da Cunha Pontes
