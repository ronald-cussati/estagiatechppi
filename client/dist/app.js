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
// ESTADO GLOBAL DO FRONT-END
// ============================================================
let vagasGlobal = [];
let filtroAtual = 'Todos';
let perfilAtual = 'estudante';
// ============================================================
// ELEMENTOS DO DOM
// ============================================================
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
// Modais
const modalCandidatura = document.getElementById('modal-candidatura');
const formCandidatura = document.getElementById('form-candidatura');
const candVagaId = document.getElementById('cand-vaga-id');
const btnFecharCandidatura = document.getElementById('btn-fechar-candidatura');
const modalEmpresa = document.getElementById('modal-empresa');
const listaInscritos = document.getElementById('lista-inscritos');
const btnFecharEmpresa = document.getElementById('btn-fechar-empresa');
// ============================================================
// SELETOR DE PERFIL
// ============================================================
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
    renderVagas();
}
btnRoleEstudante.addEventListener('click', () => setPerfil('estudante'));
btnRoleEmpresa.addEventListener('click', () => setPerfil('empresa'));
// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================
function formatarData(dataIso) {
    const data = new Date(dataIso);
    const dia = String(data.getDate());
    const mes = String(data.getMonth() + 1);
    const diaPad = dia.length === 1 ? '0' + dia : dia;
    const mesPad = mes.length === 1 ? '0' + mes : mes;
    return `${diaPad}/${mesPad}/${data.getFullYear()}`;
}
function resetarFormulario() {
    formVaga.reset();
    inputId.value = '';
    titleForm.textContent = 'Publicar Nova Vaga';
    btnSubmit.textContent = 'Publicar Vaga';
    btnCancel.classList.add('hidden');
}
// ============================================================
// VAGAS (CRUD via API)
// ============================================================
function fetchVagas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resposta = yield fetch('http://localhost:3000/vagas');
            vagasGlobal = yield resposta.json();
            renderVagas();
        }
        catch (erro) {
            console.error("Erro ao buscar vagas:", erro);
            listaVagas.innerHTML = '<p class="loading-text">Erro ao conectar com o servidor.</p>';
        }
    });
}
formVaga.addEventListener('submit', (evento) => __awaiter(this, void 0, void 0, function* () {
    evento.preventDefault();
    const titulo = inputTitulo.value.trim();
    const empresa = inputEmpresa.value.trim();
    const area = selectArea.value;
    const idEdicao = inputId.value;
    if (!titulo || !empresa) {
        alert("Por favor, preencha o Título e a Empresa corretamente.");
        return;
    }
    const dados = { titulo, empresa, area };
    try {
        if (idEdicao) {
            yield fetch(`http://localhost:3000/vagas/${idEdicao}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            alert('Vaga editada com sucesso!');
        }
        else {
            yield fetch('http://localhost:3000/vagas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            alert('Nova vaga publicada!');
        }
        resetarFormulario();
        fetchVagas();
    }
    catch (erro) {
        alert('Erro ao salvar a vaga.');
    }
}));
window.deletarVaga = (id) => __awaiter(this, void 0, void 0, function* () {
    if (!confirm('Tem certeza que deseja excluir esta vaga?'))
        return;
    try {
        yield fetch(`http://localhost:3000/vagas/${id}`, { method: 'DELETE' });
        alert('Vaga excluída.');
        fetchVagas();
    }
    catch (erro) {
        alert('Erro ao apagar a vaga.');
    }
});
window.prepararEdicao = (id) => {
    const vaga = vagasGlobal.find(v => v.id === id);
    if (!vaga)
        return;
    inputId.value = vaga.id;
    inputTitulo.value = vaga.titulo;
    inputEmpresa.value = vaga.empresa;
    selectArea.value = vaga.area;
    titleForm.textContent = 'Editar Vaga';
    btnSubmit.textContent = 'Salvar Edição';
    btnCancel.classList.remove('hidden');
};
btnCancel.addEventListener('click', resetarFormulario);
// ============================================================
// CANDIDATURAS (ESTUDANTE)
// ============================================================
window.abrirModalCandidatura = (idVaga) => {
    candVagaId.value = idVaga;
    formCandidatura.reset();
    modalCandidatura.showModal();
};
btnFecharCandidatura.addEventListener('click', () => {
    modalCandidatura.close();
});
formCandidatura.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
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
            alert("Candidatura enviada com sucesso! Boa sorte.");
            modalCandidatura.close();
            fetchVagas(); // Atualiza contador pra empresa
        }
        else {
            alert("Erro ao enviar dados. Verifique o formulário.");
        }
    }
    catch (erro) {
        alert("Erro de conexão.");
    }
}));
// ============================================================
// MODERAÇÃO DE INSCRITOS (EMPRESA)
// ============================================================
window.abrirModalEmpresa = (idVaga) => __awaiter(this, void 0, void 0, function* () {
    listaInscritos.innerHTML = '<tr><td colspan="5">Carregando candidatos...</td></tr>';
    modalEmpresa.showModal();
    try {
        const resposta = yield fetch(`http://localhost:3000/candidaturas/${idVaga}`);
        const candidatos = yield resposta.json();
        listaInscritos.innerHTML = '';
        if (candidatos.length === 0) {
            listaInscritos.innerHTML = '<tr><td colspan="5">Nenhum inscrito ainda.</td></tr>';
            return;
        }
        candidatos.forEach(cand => {
            let badgeClass = '';
            if (cand.status === 'Em análise')
                badgeClass = 'status-analise';
            else if (cand.status === 'Aprovado')
                badgeClass = 'status-aprovado';
            else
                badgeClass = 'status-rejeitado';
            const tr = document.createElement('tr');
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
            listaInscritos.appendChild(tr);
        });
    }
    catch (erro) {
        listaInscritos.innerHTML = '<tr><td colspan="5">Erro ao carregar lista.</td></tr>';
    }
});
window.mudarStatus = (idCandidatura, novoStatus, idVaga) => __awaiter(this, void 0, void 0, function* () {
    if (!confirm(`Deseja marcar este candidato como ${novoStatus}?`))
        return;
    try {
        yield fetch(`http://localhost:3000/candidaturas/${idCandidatura}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus })
        });
        // Recarrega a lista do modal
        window.abrirModalEmpresa(idVaga);
    }
    catch (erro) {
        alert("Erro ao mudar status.");
    }
});
btnFecharEmpresa.addEventListener('click', () => {
    modalEmpresa.close();
});
// ============================================================
// RENDERIZAÇÃO E FILTROS
// ============================================================
function renderVagas() {
    listaVagas.innerHTML = '';
    const vagasFiltradas = vagasGlobal.filter(vaga => {
        if (filtroAtual === 'Todos')
            return true;
        return vaga.area === filtroAtual;
    });
    if (vagasFiltradas.length === 0) {
        listaVagas.innerHTML = '<p class="loading-text">Nenhuma vaga encontrada para este filtro.</p>';
        return;
    }
    // Ícones SVG básicos
    const iconeEdit = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;
    const iconeTrash = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
    vagasFiltradas.forEach((vaga) => {
        let acoesHtml = '';
        if (perfilAtual === 'estudante') {
            acoesHtml = `<button class="btn-candidatar" onclick="abrirModalCandidatura('${vaga.id}')">Candidatar-se</button>`;
        }
        else {
            acoesHtml = `
        <span class="candidatos-count" onclick="abrirModalEmpresa('${vaga.id}')">
          ${vaga.candidatos || 0} inscritos (Ver)
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
        listaVagas.insertAdjacentHTML('beforeend', htmlCard);
    });
}
filtrosContainer.addEventListener('click', (evento) => {
    const botao = evento.target;
    if (botao.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        botao.classList.add('active');
        filtroAtual = botao.getAttribute('data-filter') || 'Todos';
        renderVagas();
    }
});
// ============================================================
// INICIALIZAÇÃO
// ============================================================
setPerfil('estudante');
fetchVagas();
