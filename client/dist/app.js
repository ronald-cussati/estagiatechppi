var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ============================================================
// VARIÁVEIS GLOBAIS (ESTADO DO SITE)
// ============================================================
// Essas variáveis guardam a "memória" do que está na tela:
// as vagas que puxamos do back-end, qual filtro foi clicado e quem está logado.
let vagasGlobal = [];
let filtroAtual = 'Todos';
let perfilAtual = 'estudante'; // Padrão: entramos como estudante
// ============================================================
// LIGAÇÃO DO JAVASCRIPT COM O HTML (DOM)
// ============================================================
// Aqui usamos document.getElementById para "pegar" as tags do HTML 
// e transformá-las em variáveis no TypeScript, permitindo mexer nelas.
const formVaga = document.getElementById('form-vaga');
const inputId = document.getElementById('vaga-id');
const inputTitulo = document.getElementById('titulo');
const inputEmpresa = document.getElementById('empresa');
const selectArea = document.getElementById('area');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const listaVagas = document.getElementById('lista-vagas');
const filtrosContainer = document.getElementById('filters-container');
const titleForm = document.getElementById('form-title');
const tituloListagem = document.getElementById('titulo-listagem');
const btnRoleEstudante = document.getElementById('btn-role-estudante');
const btnRoleEmpresa = document.getElementById('btn-role-empresa');
// Selecionamos as tags dos Modais (HTML5 <dialog>)
const modalCandidatura = document.getElementById('modal-candidatura');
const formCandidatura = document.getElementById('form-candidatura');
const candVagaId = document.getElementById('cand-vaga-id');
const btnFecharCandidatura = document.getElementById('btn-fechar-candidatura');
const modalEmpresa = document.getElementById('modal-empresa');
const listaInscritos = document.getElementById('lista-inscritos');
const btnFecharEmpresa = document.getElementById('btn-fechar-empresa');
// Elementos dos Modais de Alerta Customizados
const customAlert = document.getElementById('custom-alert');
const alertTitle = document.getElementById('alert-title');
const alertMessage = document.getElementById('alert-message');
const alertIconContainer = document.getElementById('alert-icon-container');
const btnAlertOk = document.getElementById('btn-alert-ok');
const customConfirm = document.getElementById('custom-confirm');
const confirmMessage = document.getElementById('confirm-message');
const btnConfirmOk = document.getElementById('btn-confirm-ok');
const btnConfirmCancel = document.getElementById('btn-confirm-cancel');
// Ícones vetorizados (SVG) guardados em strings para renderizar via JS.
const SVG_SUCCESS = `<div class="icon-success"><svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;
const SVG_ERROR = `<div class="icon-danger"><svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;
const SVG_INFO = `<div class="icon-warning"><svg width="56" height="56" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;
// ============================================================
// POP-UPS INTELIGENTES (A MAGIA DAS PROMISES)
// ============================================================
// Em vez de usar o velho `alert()`, criamos essa função.
// Ela retorna uma "Promessa". O código inteiro "congela" e espera o usuário apertar o botão "OK".
// Só então a promessa é resolvida (resolve()) e o fluxo volta a andar.
function mostrarAlerta(mensagem, tipo = 'info') {
    return new Promise((resolve) => {
        alertMessage.textContent = mensagem; // Troca o texto na tela
        // Define cores e ícones baseados no tipo do alerta
        if (tipo === 'sucesso') {
            alertTitle.textContent = "Sucesso!";
            alertIconContainer.innerHTML = SVG_SUCCESS;
        }
        else if (tipo === 'erro') {
            alertTitle.textContent = "Erro";
            alertIconContainer.innerHTML = SVG_ERROR;
        }
        else {
            alertTitle.textContent = "Aviso";
            alertIconContainer.innerHTML = SVG_INFO;
        }
        customAlert.showModal(); // O HTML5 abre a janela
        // O que acontece ao clicar no OK?
        const aoClicarOk = () => {
            customAlert.close(); // Fecha
            btnAlertOk.removeEventListener('click', aoClicarOk); // Limpa evento antigo
            resolve(); // A promessa é cumprida! O código avança.
        };
        btnAlertOk.addEventListener('click', aoClicarOk);
    });
}
// O mesmo raciocínio, mas simulando a pergunta `confirm(Sim/Não)`.
// Retorna um booleano: true (Sim) ou false (Não).
function mostrarConfirm(mensagem) {
    return new Promise((resolve) => {
        confirmMessage.textContent = mensagem;
        customConfirm.showModal();
        const finalizar = (resultado) => {
            customConfirm.close();
            btnConfirmOk.removeEventListener('click', btnConfirmOkHandler);
            btnConfirmCancel.removeEventListener('click', btnConfirmCancelHandler);
            resolve(resultado);
        };
        const btnConfirmOkHandler = () => finalizar(true);
        const btnConfirmCancelHandler = () => finalizar(false);
        btnConfirmOk.addEventListener('click', btnConfirmOkHandler);
        btnConfirmCancel.addEventListener('click', btnConfirmCancelHandler);
    });
}
// ============================================================
// TROCA DE PERFIL (EMPRESA / ESTUDANTE)
// ============================================================
// Essa função altera uma tag especial no body (data-perfil).
// O CSS entra em ação e oculta ou exibe os menus dependendo dessa tag!
function setPerfil(perfil) {
    perfilAtual = perfil;
    document.body.setAttribute('data-perfil', perfil);
    if (perfil === 'estudante') {
        btnRoleEstudante.classList.add('active');
        btnRoleEmpresa.classList.remove('active');
        tituloListagem.textContent = "Vagas em Destaque";
    }
    else {
        btnRoleEmpresa.classList.add('active');
        btnRoleEstudante.classList.remove('active');
        tituloListagem.textContent = "Gerenciar Vagas Publicadas";
    }
    // Ao trocar de conta, mandamos repintar as vagas, pois os botões vão mudar (Candidatar x Excluir).
    renderVagas();
}
btnRoleEstudante.addEventListener('click', () => setPerfil('estudante'));
btnRoleEmpresa.addEventListener('click', () => setPerfil('empresa'));
// ============================================================
// FUNÇÕES ÚTEIS
// ============================================================
function formatarData(dataIso) {
    // Lógica simples de formatação: se o dia for "5", transforma em "05"
    const data = new Date(dataIso);
    const dia = String(data.getDate());
    const mes = String(data.getMonth() + 1); // getMonth começa no 0!
    const diaPad = dia.length === 1 ? '0' + dia : dia;
    const mesPad = mes.length === 1 ? '0' + mes : mes;
    return `${diaPad}/${mesPad}/${data.getFullYear()}`;
}
function resetarFormulario() {
    formVaga.reset();
    inputId.value = ''; // Limpamos o input oculto de edição
    titleForm.textContent = 'Publicar Nova Vaga';
    btnSubmit.textContent = 'Publicar Vaga';
    btnCancel.classList.add('hidden');
}
// ============================================================
// COMUNICAÇÃO COM O SERVIDOR (O CORAÇÃO DO SISTEMA)
// ============================================================
// Pede (GET) a lista de vagas para a API no localhost:3000
function fetchVagas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resposta = yield fetch('http://localhost:3000/vagas');
            vagasGlobal = yield resposta.json(); // Pega a resposta e transforma em objeto do JavaScript
            renderVagas(); // Renderiza os "cards" na tela
        }
        catch (erro) {
            console.error("Erro de rede. O Node.js tá rodando?", erro);
            listaVagas.innerHTML = '<p class="loading-text">Erro ao conectar com o servidor. O back-end foi iniciado?</p>';
        }
    });
}
// Quando a empresa clica em "Publicar Vaga"
formVaga.addEventListener('submit', (evento) => __awaiter(this, void 0, void 0, function* () {
    evento.preventDefault(); // Evita a página recarregar sozinha (Comportamento padrão do form)
    const titulo = inputTitulo.value.trim(); // .trim() remove espaços em branco inúteis "  vaga " -> "vaga"
    const empresa = inputEmpresa.value.trim();
    const area = selectArea.value;
    const idEdicao = inputId.value;
    if (!titulo || !empresa) {
        mostrarAlerta("O Título e a Empresa não podem estar vazios ou só conter espaços.", "erro");
        return;
    }
    const dados = { titulo, empresa, area };
    // Usamos async/await pois mandar pacotes na internet (fetch) leva milissegundos
    // e precisamos aguardar a resposta antes de prosseguir.
    try {
        if (idEdicao) {
            // Se houver um idEdicao, significa que é o Modo Edição (PUT)
            yield fetch(`http://localhost:3000/vagas/${idEdicao}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            yield mostrarAlerta('Vaga editada com sucesso!', 'sucesso');
        }
        else {
            // Caso contrário, é criar uma nova vaga (POST)
            yield fetch('http://localhost:3000/vagas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            yield mostrarAlerta('Nova vaga publicada com sucesso!', 'sucesso');
        }
        resetarFormulario();
        fetchVagas(); // Recarrega do servidor a lista nova
    }
    catch (erro) {
        mostrarAlerta('Erro de conexão ao salvar a vaga.', 'erro');
    }
}));
// A empresa quer deletar uma vaga.
// (Usamos "window as any" para a função ser lida no "onclick" no HTML).
window.deletarVaga = (id) => __awaiter(this, void 0, void 0, function* () {
    // Chamamos nosso modal customizado e aguardamos o clique
    const confirmacao = yield mostrarConfirm('Tem certeza que deseja excluir esta vaga? Os dados da vaga e candidatos serão apagados.');
    if (!confirmacao)
        return; // Cai fora se clikou "Cancelar"
    try {
        yield fetch(`http://localhost:3000/vagas/${id}`, { method: 'DELETE' });
        yield mostrarAlerta('Vaga excluída permanentemente.', 'sucesso');
        fetchVagas();
    }
    catch (erro) {
        mostrarAlerta('Falha ao apagar a vaga no servidor.', 'erro');
    }
});
window.prepararEdicao = (id) => {
    // Procura no nosso vetor de vagas qual é a que queremos editar
    const vaga = vagasGlobal.find(v => v.id === id);
    if (!vaga)
        return;
    // Preenche os campinhos do lado esquerdo para o usuário
    inputId.value = vaga.id;
    inputTitulo.value = vaga.titulo;
    inputEmpresa.value = vaga.empresa;
    selectArea.value = vaga.area;
    titleForm.textContent = 'Editar Vaga';
    btnSubmit.textContent = 'Salvar Edição';
    btnCancel.classList.remove('hidden');
    // Sobe a tela pra pessoa ver o form
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
btnCancel.addEventListener('click', resetarFormulario);
// ============================================================
// ÁREA DO ESTUDANTE (ENVIAR CANDIDATURA)
// ============================================================
window.abrirModalCandidatura = (idVaga) => {
    candVagaId.value = idVaga; // Guarda a qual vaga ele tá se aplicando escondido no form
    formCandidatura.reset();
    modalCandidatura.showModal();
};
btnFecharCandidatura.addEventListener('click', () => {
    modalCandidatura.close();
});
// Ao clicar em Enviar Candidatura
formCandidatura.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
    // Monta a maleta (payload) de dados do jovem
    const payload = {
        idVaga: candVagaId.value,
        nomeCandidato: document.getElementById('cand-nome').value,
        idade: document.getElementById('cand-idade').value,
        curso: document.getElementById('cand-curso').value,
        periodo: document.getElementById('cand-periodo').value,
        email: document.getElementById('cand-email').value,
        github: document.getElementById('cand-github').value,
        linkedin: document.getElementById('cand-linkedin').value,
    };
    try {
        const res = yield fetch('http://localhost:3000/candidaturas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            modalCandidatura.close();
            yield mostrarAlerta("Sua candidatura voou para a empresa! Boa sorte na entrevista.", "sucesso");
            fetchVagas(); // Atualiza a tela pra dar um 'refresh' no contador de inscritos pra empresa
        }
        else {
            mostrarAlerta("Falha: A API recusou os dados. Verifique o preenchimento.", "erro");
        }
    }
    catch (erro) {
        mostrarAlerta("Erro de rede. Node.js caiu?", "erro");
    }
}));
// ============================================================
// PAINEL DE MODERAÇÃO (EMPRESA AVALIANDO ALUNOS)
// ============================================================
window.abrirModalEmpresa = (idVaga) => __awaiter(this, void 0, void 0, function* () {
    // Começa escrevendo "Carregando" na tabela
    listaInscritos.innerHTML = '<tr><td colspan="5">Carregando candidatos pelo Back-end...</td></tr>';
    modalEmpresa.showModal();
    try {
        // Buscar todos os estudantes atrelados àquela vaga específica
        const resposta = yield fetch(`http://localhost:3000/candidaturas/${idVaga}`);
        const candidatos = yield resposta.json();
        listaInscritos.innerHTML = '';
        // Se a lista (array) tiver vazia (length = 0)
        if (candidatos.length === 0) {
            listaInscritos.innerHTML = '<tr><td colspan="5">Poxa, ninguém se inscreveu nesta vaga ainda.</td></tr>';
            return;
        }
        // Se achou galera, usamos um Foreach (laço de repetição) para injetar HTML linha por linha (<tr>)
        candidatos.forEach(cand => {
            let badgeClass = '';
            if (cand.status === 'Em análise')
                badgeClass = 'status-analise';
            else if (cand.status === 'Aprovado')
                badgeClass = 'status-aprovado';
            else
                badgeClass = 'status-rejeitado';
            const tr = document.createElement('tr');
            // Injeta variáveis com "Templates Literals" (`${variavel}`) 
            tr.innerHTML = `
        <td>
          <strong>${cand.nomeCandidato}</strong><br>
          <small>${cand.idade} anos | ${cand.email}</small>
        </td>
        <td>${cand.curso}<br><small>${cand.periodo}</small></td>
        <td>
          <a href="${cand.github}" target="_blank">GitHub</a>
          ${cand.linkedin ? `<br><a href="${cand.linkedin}" target="_blank">LinkedIn</a>` : ''}
        </td>
        <td><span class="badge-status ${badgeClass}">${cand.status}</span></td>
        <td>
          <button class="btn-status ap" onclick="mudarStatus('${cand.id}', 'Aprovado', '${idVaga}')">✓ Aprovar</button>
          <button class="btn-status rj" onclick="mudarStatus('${cand.id}', 'Rejeitado', '${idVaga}')">✕ Rejeitar</button>
        </td>
      `;
            listaInscritos.appendChild(tr); // Gruda a linha na tabela
        });
    }
    catch (erro) {
        listaInscritos.innerHTML = '<tr><td colspan="5">Falhou ao ler os dados do banco/array.</td></tr>';
    }
});
window.mudarStatus = (idCandidatura, novoStatus, idVaga) => __awaiter(this, void 0, void 0, function* () {
    const confirmacao = yield mostrarConfirm(`Marcar como ${novoStatus}? O candidato receberia esse e-mail.`);
    if (!confirmacao)
        return;
    try {
        // PUT é usado na REST API para Atualizações (Updates)
        yield fetch(`http://localhost:3000/candidaturas/${idCandidatura}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus })
        });
        // O status mudou! Chama a tela de tabela de novo para reescrever com as cores atualizadas!
        window.abrirModalEmpresa(idVaga);
    }
    catch (erro) {
        mostrarAlerta("Erro ao gravar o novo status.", "erro");
    }
});
btnFecharEmpresa.addEventListener('click', () => {
    modalEmpresa.close();
});
// ============================================================
// PINTOR DA TELA E FILTRAGEM DE CATEGORIAS
// ============================================================
function renderVagas() {
    listaVagas.innerHTML = '';
    // .filter() é um método do ES6 de Array que exclui o que não bate com a regra
    const vagasFiltradas = vagasGlobal.filter(vaga => {
        if (filtroAtual === 'Todos')
            return true; // Mostra geral
        return vaga.area === filtroAtual; // Mostra só 'Backend', 'Frontend', etc
    });
    if (vagasFiltradas.length === 0) {
        listaVagas.innerHTML = '<p class="loading-text">Nenhuma vaga atende ao seu filtro.</p>';
        return;
    }
    // Desenhando os ícones aqui pra não poluir lá embaixo
    const iconeEdit = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;
    const iconeTrash = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
    vagasFiltradas.forEach((vaga) => {
        let acoesHtml = '';
        // Regra de Ouro: Estudante clica pra Candidatar. Empresa clica pra Editar.
        if (perfilAtual === 'estudante') {
            acoesHtml = `<button class="btn-candidatar" onclick="abrirModalCandidatura('${vaga.id}')">Quero essa Vaga!</button>`;
        }
        else {
            acoesHtml = `
        <span class="candidatos-count" onclick="abrirModalEmpresa('${vaga.id}')">
          ${vaga.candidatos || 0} currículos recebidos
        </span>
        <div class="vaga-actions">
          <button class="btn-icon" onclick="prepararEdicao('${vaga.id}')" title="Editar">${iconeEdit}</button>
          <button class="btn-icon" onclick="deletarVaga('${vaga.id}')" title="Excluir">${iconeTrash}</button>
        </div>
      `;
        }
        const htmlCard = `
      <article class="vaga-item">
        <h3 class="vaga-title">${vaga.titulo}</h3>
        <p class="vaga-empresa">${vaga.empresa}</p>
        <span class="vaga-area">${vaga.area}</span>
        
        <div class="vaga-footer">
          <span class="vaga-date">${formatarData(vaga.dataCriacao)}</span>
          ${acoesHtml}
        </div>
      </article>
    `;
        // Injeta na div do grid como 'último filho'
        listaVagas.insertAdjacentHTML('beforeend', htmlCard);
    });
}
// Ouve os cliques lá em cima nas bolhas de "Filtros"
filtrosContainer.addEventListener('click', (evento) => {
    const botao = evento.target;
    if (botao.classList.contains('filter-btn')) {
        // Remove o botão azul dos outros
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        // Coloca o fundo azul só em quem eu cliquei
        botao.classList.add('active');
        // Puxa o 'data-filter' ("Frontend", "Data", etc)
        filtroAtual = botao.getAttribute('data-filter') || 'Todos';
        // Repinta a tela com a restrição
        renderVagas();
    }
});
// ============================================================
// START (Ponto de Ignição)
// ============================================================
// O código todo só define regras e funções. Aqui embaixo nós executamos na prática ao abrir a página:
setPerfil('estudante'); // Liga no perfil estudante
fetchVagas(); // Faz a chamada GET pra preencher a tela na primeira vez
