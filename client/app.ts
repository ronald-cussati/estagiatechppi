// ============================================================
// CONTRATO DE DADOS — Interfaces TypeScript
// ============================================================
interface IVaga {
  id: string;
  titulo: string;
  empresa: string;
  area: string;
  dataCriacao: string;
  candidatos?: number; 
}

interface ICandidatura {
  id: string;
  idVaga: string;
  nomeCandidato: string;
  idade: string;
  curso: string;
  periodo: string;
  email: string;
  github: string;
  linkedin: string;
  status: 'Em análise' | 'Aprovado' | 'Rejeitado';
  dataCandidatura: string;
}

// ============================================================
// ESTADO GLOBAL DO FRONT-END
// ============================================================
let vagasGlobal: IVaga[] = [];
let filtroAtual: string = 'Todos';
let perfilAtual: 'estudante' | 'empresa' = 'estudante';

// ============================================================
// ELEMENTOS DO DOM
// ============================================================
const formVaga = document.getElementById('form-vaga') as HTMLFormElement;
const inputId = document.getElementById('vaga-id') as HTMLInputElement;
const inputTitulo = document.getElementById('titulo') as HTMLInputElement;
const inputEmpresa = document.getElementById('empresa') as HTMLInputElement;
const selectArea = document.getElementById('area') as HTMLSelectElement;
const btnSubmit = document.getElementById('btn-submit') as HTMLButtonElement;
const btnCancel = document.getElementById('btn-cancel') as HTMLButtonElement;
const listaVagas = document.getElementById('lista-vagas') as HTMLDivElement;
const filtrosContainer = document.getElementById('filters-container') as HTMLDivElement;
const titleForm = document.getElementById('form-title') as HTMLHeadingElement;
const tituloListagem = document.getElementById('titulo-listagem') as HTMLHeadingElement;

const btnRoleEstudante = document.getElementById('btn-role-estudante') as HTMLButtonElement;
const btnRoleEmpresa = document.getElementById('btn-role-empresa') as HTMLButtonElement;

// Modais App
const modalCandidatura = document.getElementById('modal-candidatura') as HTMLDialogElement;
const formCandidatura = document.getElementById('form-candidatura') as HTMLFormElement;
const candVagaId = document.getElementById('cand-vaga-id') as HTMLInputElement;
const btnFecharCandidatura = document.getElementById('btn-fechar-candidatura') as HTMLButtonElement;

const modalEmpresa = document.getElementById('modal-empresa') as HTMLDialogElement;
const listaInscritos = document.getElementById('lista-inscritos') as HTMLTableSectionElement;
const btnFecharEmpresa = document.getElementById('btn-fechar-empresa') as HTMLButtonElement;

// ============================================================
// SISTEMA DE POP-UPS CUSTOMIZADOS (ALERTS / CONFIRMS)
// ============================================================
const customAlert = document.getElementById('custom-alert') as HTMLDialogElement;
const alertTitle = document.getElementById('alert-title') as HTMLHeadingElement;
const alertMessage = document.getElementById('alert-message') as HTMLParagraphElement;
const alertIconContainer = document.getElementById('alert-icon-container') as HTMLDivElement;
const btnAlertOk = document.getElementById('btn-alert-ok') as HTMLButtonElement;

const customConfirm = document.getElementById('custom-confirm') as HTMLDialogElement;
const confirmMessage = document.getElementById('confirm-message') as HTMLParagraphElement;
const btnConfirmOk = document.getElementById('btn-confirm-ok') as HTMLButtonElement;
const btnConfirmCancel = document.getElementById('btn-confirm-cancel') as HTMLButtonElement;

const SVG_SUCCESS = `<div class="icon-success"><svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;
const SVG_ERROR = `<div class="icon-danger"><svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;
const SVG_INFO = `<div class="icon-warning"><svg width="56" height="56" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;

// Função utilitária para substituir o alert() do navegador
function mostrarAlerta(mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'info'): Promise<void> {
  return new Promise((resolve) => {
    alertMessage.textContent = mensagem;
    
    if (tipo === 'sucesso') {
      alertTitle.textContent = "Sucesso!";
      alertIconContainer.innerHTML = SVG_SUCCESS;
    } else if (tipo === 'erro') {
      alertTitle.textContent = "Erro";
      alertIconContainer.innerHTML = SVG_ERROR;
    } else {
      alertTitle.textContent = "Aviso";
      alertIconContainer.innerHTML = SVG_INFO;
    }

    customAlert.showModal();

    const aoClicarOk = () => {
      customAlert.close();
      btnAlertOk.removeEventListener('click', aoClicarOk);
      resolve();
    };

    btnAlertOk.addEventListener('click', aoClicarOk);
  });
}

// Função utilitária para substituir o confirm() do navegador
function mostrarConfirm(mensagem: string): Promise<boolean> {
  return new Promise((resolve) => {
    confirmMessage.textContent = mensagem;
    customConfirm.showModal();

    const finalizar = (resultado: boolean) => {
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
// SELETOR DE PERFIL
// ============================================================
function setPerfil(perfil: 'estudante' | 'empresa') {
  perfilAtual = perfil;
  document.body.setAttribute('data-perfil', perfil);
  
  if (perfil === 'estudante') {
    btnRoleEstudante.classList.add('active');
    btnRoleEmpresa.classList.remove('active');
    tituloListagem.textContent = "Vagas em Destaque";
  } else {
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
function formatarData(dataIso: string): string {
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
async function fetchVagas() {
  try {
    const resposta = await fetch('http://localhost:3000/vagas');
    vagasGlobal = await resposta.json();
    renderVagas();
  } catch (erro) {
    console.error("Erro ao buscar vagas:", erro);
    listaVagas.innerHTML = '<p class="loading-text">Erro ao conectar com o servidor.</p>';
  }
}

formVaga.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const titulo = inputTitulo.value.trim();
  const empresa = inputEmpresa.value.trim();
  const area = selectArea.value;
  const idEdicao = inputId.value;

  if (!titulo || !empresa) {
    mostrarAlerta("Por favor, preencha o Título e a Empresa corretamente.", "erro");
    return;
  }

  const dados = { titulo, empresa, area };

  try {
    if (idEdicao) {
      await fetch(`http://localhost:3000/vagas/${idEdicao}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      await mostrarAlerta('Vaga editada com sucesso!', 'sucesso');
    } else {
      await fetch('http://localhost:3000/vagas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      await mostrarAlerta('Nova vaga publicada com sucesso!', 'sucesso');
    }
    resetarFormulario();
    fetchVagas();
  } catch (erro) {
    mostrarAlerta('Erro de conexão ao salvar a vaga.', 'erro');
  }
});

(window as any).deletarVaga = async (id: string) => {
  const confirmacao = await mostrarConfirm('Tem certeza que deseja excluir esta vaga? Todos os dados serão perdidos.');
  if (!confirmacao) return;

  try {
    await fetch(`http://localhost:3000/vagas/${id}`, { method: 'DELETE' });
    await mostrarAlerta('Vaga excluída com sucesso.', 'sucesso');
    fetchVagas();
  } catch (erro) {
    mostrarAlerta('Erro ao apagar a vaga.', 'erro');
  }
};

(window as any).prepararEdicao = (id: string) => {
  const vaga = vagasGlobal.find(v => v.id === id);
  if (!vaga) return;

  inputId.value = vaga.id;
  inputTitulo.value = vaga.titulo;
  inputEmpresa.value = vaga.empresa;
  selectArea.value = vaga.area;

  titleForm.textContent = 'Editar Vaga';
  btnSubmit.textContent = 'Salvar Edição';
  btnCancel.classList.remove('hidden');
  
  // Rola suavemente pro topo pro usuário ver o form
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

btnCancel.addEventListener('click', resetarFormulario);

// ============================================================
// CANDIDATURAS (ESTUDANTE)
// ============================================================
(window as any).abrirModalCandidatura = (idVaga: string) => {
  candVagaId.value = idVaga;
  formCandidatura.reset();
  modalCandidatura.showModal();
};

btnFecharCandidatura.addEventListener('click', () => {
  modalCandidatura.close();
});

formCandidatura.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const payload = {
    idVaga: candVagaId.value,
    nomeCandidato: (document.getElementById('cand-nome') as HTMLInputElement).value,
    idade: (document.getElementById('cand-idade') as HTMLInputElement).value,
    curso: (document.getElementById('cand-curso') as HTMLInputElement).value,
    periodo: (document.getElementById('cand-periodo') as HTMLSelectElement).value,
    email: (document.getElementById('cand-email') as HTMLInputElement).value,
    github: (document.getElementById('cand-github') as HTMLInputElement).value,
    linkedin: (document.getElementById('cand-linkedin') as HTMLInputElement).value,
  };

  try {
    const res = await fetch('http://localhost:3000/candidaturas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      modalCandidatura.close();
      await mostrarAlerta("Candidatura enviada com sucesso! Boa sorte.", "sucesso");
      fetchVagas(); // Atualiza contador pra empresa
    } else {
      mostrarAlerta("Erro ao enviar dados. Verifique o formulário.", "erro");
    }
  } catch (erro) {
    mostrarAlerta("Erro de conexão.", "erro");
  }
});

// ============================================================
// MODERAÇÃO DE INSCRITOS (EMPRESA)
// ============================================================
(window as any).abrirModalEmpresa = async (idVaga: string) => {
  listaInscritos.innerHTML = '<tr><td colspan="5">Carregando candidatos...</td></tr>';
  modalEmpresa.showModal();

  try {
    const resposta = await fetch(`http://localhost:3000/candidaturas/${idVaga}`);
    const candidatos: ICandidatura[] = await resposta.json();
    
    listaInscritos.innerHTML = '';
    
    if (candidatos.length === 0) {
      listaInscritos.innerHTML = '<tr><td colspan="5">Nenhum inscrito ainda.</td></tr>';
      return;
    }

    candidatos.forEach(cand => {
      let badgeClass = '';
      if (cand.status === 'Em análise') badgeClass = 'status-analise';
      else if (cand.status === 'Aprovado') badgeClass = 'status-aprovado';
      else badgeClass = 'status-rejeitado';

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

  } catch (erro) {
    listaInscritos.innerHTML = '<tr><td colspan="5">Erro ao carregar lista.</td></tr>';
  }
};

(window as any).mudarStatus = async (idCandidatura: string, novoStatus: string, idVaga: string) => {
  const confirmacao = await mostrarConfirm(`Deseja marcar este candidato como ${novoStatus}?`);
  if (!confirmacao) return;
  
  try {
    await fetch(`http://localhost:3000/candidaturas/${idCandidatura}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus })
    });
    // Recarrega a lista do modal
    (window as any).abrirModalEmpresa(idVaga);
  } catch (erro) {
    mostrarAlerta("Erro ao mudar status.", "erro");
  }
};

btnFecharEmpresa.addEventListener('click', () => {
  modalEmpresa.close();
});

// ============================================================
// RENDERIZAÇÃO E FILTROS
// ============================================================
function renderVagas() {
  listaVagas.innerHTML = '';
  const vagasFiltradas = vagasGlobal.filter(vaga => {
    if (filtroAtual === 'Todos') return true;
    return vaga.area === filtroAtual;
  });

  if (vagasFiltradas.length === 0) {
    listaVagas.innerHTML = '<p class="loading-text">Nenhuma vaga encontrada para este filtro.</p>';
    return;
  }

  const iconeEdit = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;
  const iconeTrash = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;

  vagasFiltradas.forEach((vaga) => {
    let acoesHtml = '';
    
    if (perfilAtual === 'estudante') {
      acoesHtml = `<button class="btn-candidatar" onclick="abrirModalCandidatura('${vaga.id}')">Candidatar-se</button>`;
    } else {
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
  const botao = evento.target as HTMLElement;
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
