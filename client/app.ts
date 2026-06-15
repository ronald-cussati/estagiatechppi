// ============================================================
// CONTRATO DE DADOS — Interfaces TypeScript
// ============================================================
interface IVaga {
  id: string;
  titulo: string;
  empresa: string;
  area: string;
  dataCriacao: string;
  candidatos?: number; // Agora recebemos a contagem de candidatos da API
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

// ============================================================
// SELETOR DE PERFIL (A Mágica da SPA)
// ============================================================
function setPerfil(perfil: 'estudante' | 'empresa') {
  perfilAtual = perfil;
  
  // Atualiza atributo no body para o CSS esconder/mostrar as coisas
  document.body.setAttribute('data-perfil', perfil);
  
  // Atualiza botões
  if (perfil === 'estudante') {
    btnRoleEstudante.classList.add('active');
    btnRoleEmpresa.classList.remove('active');
    tituloListagem.textContent = "Vagas em Destaque";
  } else {
    btnRoleEmpresa.classList.add('active');
    btnRoleEstudante.classList.remove('active');
    tituloListagem.textContent = "Gerenciar Vagas Publicadas";
  }
  
  // Re-renderiza a lista para trocar os botões de ação (Candidatar vs Editar/Apagar)
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
  const ano = data.getFullYear();
  
  const diaPad = dia.length === 1 ? '0' + dia : dia;
  const mesPad = mes.length === 1 ? '0' + mes : mes;
  
  return `${diaPad}/${mesPad}/${ano}`;
}

function resetarFormulario() {
  formVaga.reset();
  inputId.value = '';
  titleForm.textContent = 'Publicar Nova Vaga';
  btnSubmit.textContent = 'Publicar Vaga';
  btnCancel.classList.add('hidden');
}

// ============================================================
// FUNÇÕES PRINCIPAIS (CRUD via API)
// ============================================================

// 1. LER VAGAS (GET)
async function fetchVagas() {
  try {
    const resposta = await fetch('http://localhost:3000/vagas');
    const vagasRecebidas: IVaga[] = await resposta.json();
    vagasGlobal = vagasRecebidas;
    renderVagas();
  } catch (erro) {
    console.error("Erro ao buscar vagas:", erro);
    listaVagas.innerHTML = '<p class="loading-text">Erro ao conectar com o servidor.</p>';
  }
}

// 2. CRIAR ou EDITAR VAGA (POST / PUT)
formVaga.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  // O trim() evita que apenas espaços ("   ") passem pela validação
  const titulo = inputTitulo.value.trim();
  const empresa = inputEmpresa.value.trim();
  const area = selectArea.value;
  const idEdicao = inputId.value;

  if (!titulo || !empresa) {
    alert("Por favor, preencha o Título e a Empresa com textos válidos.");
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
    } else {
      await fetch('http://localhost:3000/vagas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    }

    resetarFormulario();
    fetchVagas();
  } catch (erro) {
    console.error("Erro ao salvar vaga:", erro);
    alert('Erro ao salvar a vaga. Tente novamente.');
  }
});

// 3. APAGAR VAGA (DELETE)
(window as any).deletarVaga = async (id: string) => {
  if (!confirm('Tem certeza que deseja excluir esta vaga? Todos os candidatos serão perdidos.')) return;

  try {
    await fetch(`http://localhost:3000/vagas/${id}`, {
      method: 'DELETE'
    });
    fetchVagas();
  } catch (erro) {
    console.error("Erro ao apagar vaga:", erro);
    alert('Erro ao apagar a vaga.');
  }
};

// 4. PREPARAR EDIÇÃO
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
};

btnCancel.addEventListener('click', resetarFormulario);

// 5. CANDIDATAR-SE À VAGA (POST)
(window as any).candidatarSe = async (idVaga: string) => {
  const nomeCandidato = prompt("Para se candidatar, digite o seu nome completo:");
  
  if (!nomeCandidato || nomeCandidato.trim() === '') {
    return; // Usuário cancelou ou enviou vazio
  }

  try {
    const resposta = await fetch('http://localhost:3000/candidaturas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idVaga, nomeCandidato: nomeCandidato.trim() })
    });

    if (resposta.ok) {
      alert(`Parabéns, ${nomeCandidato}! Sua candidatura foi enviada para a empresa.`);
      // Recarregamos as vagas para o número de candidatos atualizar (visível pra empresa)
      fetchVagas(); 
    } else {
      alert("Erro ao enviar candidatura.");
    }
  } catch (erro) {
    console.error("Erro na candidatura:", erro);
    alert('Não foi possível conectar ao servidor.');
  }
};


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

  vagasFiltradas.forEach((vaga) => {
    // Cores Neon / Pastel pro Badge
    let corBadge = '';
    let bgColor = '';
    
    switch(vaga.area) {
      case 'Frontend': bgColor = 'rgba(45, 212, 191, 0.2)'; corBadge = '#2dd4bf'; break; // Verde Mint
      case 'Backend': bgColor = 'rgba(139, 92, 246, 0.2)'; corBadge = '#a78bfa'; break; // Roxo
      case 'Data': bgColor = 'rgba(251, 146, 60, 0.2)'; corBadge = '#fdba74'; break; // Laranja
      case 'Mobile': bgColor = 'rgba(244, 114, 182, 0.2)'; corBadge = '#f472b6'; break; // Rosa
    }

    // HTML Condicional dependendo do papel (Role)
    let acoesHtml = '';
    
    if (perfilAtual === 'estudante') {
      acoesHtml = `
        <button class="btn-candidatar" onclick="candidatarSe('${vaga.id}')">Candidatar-se</button>
      `;
    } else {
      // Perfil Empresa: Vê contador e botões de moderação
      acoesHtml = `
        <span class="candidatos-count">👥 ${vaga.candidatos || 0} inscritos</span>
        <div class="vaga-actions">
          <button class="btn-icon" onclick="prepararEdicao('${vaga.id}')" title="Editar">✏️</button>
          <button class="btn-icon" onclick="deletarVaga('${vaga.id}')" title="Excluir">🗑️</button>
        </div>
      `;
    }

    const htmlCard = `
      <article class="vaga-item">
        <h3 class="vaga-title">${vaga.titulo}</h3>
        <p class="vaga-empresa">${vaga.empresa}</p>
        <span class="vaga-area" style="background-color: ${bgColor}; color: ${corBadge};">
          ${vaga.area}
        </span>
        
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
// Ao carregar a página
setPerfil('estudante'); // Inicia como estudante
fetchVagas();
