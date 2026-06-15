"use strict";
// client/app.ts
const URL_API = 'http://localhost:3000/vagas';
// Mapeamento explícito de elementos do DOM com asserção de tipos correta
const form = document.getElementById('formCadastro');
const inputTitulo = document.getElementById('txtTitulo');
const inputEmpresa = document.getElementById('txtEmpresa');
const selectArea = document.getElementById('selectArea');
const listaContainer = document.getElementById('listaContainer');
// FUNÇÃO ASSÍNCRONA: Buscar itens da API e renderizar na tela
async function carregarElementos() {
    try {
        const resposta = await fetch(URL_API);
        if (!resposta.ok)
            throw new Error("Erro ao conectar na API de listagem.");
        const dados = await resposta.json();
        // Limpa o aviso de carregamento
        listaContainer.innerHTML = "";
        if (dados.length === 0) {
            listaContainer.innerHTML = "<p>Nenhuma vaga cadastrada no servidor.</p>";
            return;
        }
        // Mapeamento estruturado e criação dinâmica de elementos em tela
        dados.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'card-item';
            const dataFormatada = new Date(item.dataCriacao).toLocaleString('pt-BR');
            card.innerHTML = `
        <h3>${item.titulo}</h3>
        <p><strong>Empresa:</strong> ${item.empresa}</p>
        <p><strong>Área:</strong> ${item.area}</p>
        <small>Cadastrado em: ${dataFormatada}</small>
      `;
            listaContainer.appendChild(card);
        });
    }
    catch (erro) {
        console.error("[ERRO FRONTE]", erro);
        listaContainer.innerHTML = "<p style='color:red;'>Erro de rede ao buscar registros.</p>";
    }
}
// EVENTO DE SUBMISSÃO DO FORMULÁRIO
form.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Impede o recarregamento clássico da página
    const cargaUtil = {
        titulo: inputTitulo.value.trim(),
        empresa: inputEmpresa.value.trim(),
        area: selectArea.value
    };
    try {
        const resposta = await fetch(URL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cargaUtil) // Transforma o objeto em string JSON para a rede
        });
        if (resposta.status === 201) {
            // Limpa os campos do formulário se salvou corretamente
            form.reset();
            // Atualiza a lista automaticamente na tela
            await carregarElementos();
        }
        else {
            alert("Falha ao cadastrar item no servidor.");
        }
    }
    catch (erro) {
        alert("Servidor offline ou falha crítica de rede externa.");
    }
});
// DISPARO AUTOMÁTICO INICIAL AO ABRIR O NAVEGADOR
carregarElementos();
