# Contexto do Projeto — EstagiaTech PPI

## Sobre o projeto
Aplicação Full Stack acadêmica desenvolvida para a disciplina **Programação para Internet** da Faculdade Multivix.
**Tema:** EstagiaTech — plataforma de cadastro e listagem de vagas de estágio em TI.
**Integrantes:** Leonarda Candal de Carvalho e Ronald Cussati Cesar da Fonseca.
**Prazo de entrega:** 17/06/2026. Entrevista técnica: 16/06/2026.

---

## Stack obrigatória (definida pelo professor)
- **Back-end:** Node.js + TypeScript + Express.js
- **Front-end:** HTML5 semântico + CSS3 (Mobile-First, Flexbox) + TypeScript compilado para JS
- **Dados:** array em memória (sem banco de dados)
- **Package manager:** npm
- **Repositório:** GitHub com pastas `/server` e `/client`

---

## Contrato de dados — Interface principal
```typescript
interface IVaga {
  id: string;          // Date.now().toString() — gerado pelo servidor
  titulo: string;      // Ex: "Desenvolvedor Frontend Jr"
  empresa: string;     // Ex: "Stefanini"
  area: string;        // "Frontend" | "Backend" | "Data" | "Mobile"
  dataCriacao: string; // new Date().toISOString()
}
```

---

## Decisões técnicas importantes
- `Omit<IVaga, 'id' | 'dataCriacao'>` no POST.
- Interface duplicada no `app.ts` (sem bundler, sem import cross-pasta).
- Filtro sem nova requisição opera localmente no front-end.
- `<article>` para os cards de vaga.
- `ts-node-dev` para hot reload no desenvolvimento do servidor.
- Seed com 3 vagas pré-cadastradas.
