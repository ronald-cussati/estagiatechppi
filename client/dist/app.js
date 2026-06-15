var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// ============================================================
// VARIÁVEIS GLOBAIS (ESTADO DO SITE)
// ============================================================
// Essas variáveis guardam a "memória" do que está na tela:
// as vagas que puxamos do back-end, qual filtro foi clicado e quem está logado.
var vagasGlobal = [];
var filtroAtual = 'Todos';
var perfilAtual = 'estudante'; // Padrão: entramos como estudante
// ============================================================
// LIGAÇÃO DO JAVASCRIPT COM O HTML (DOM)
// ============================================================
// Aqui usamos document.getElementById para "pegar" as tags do HTML 
// e transformá-las em variáveis no TypeScript, permitindo mexer nelas.
var formVaga = document.getElementById('form-vaga');
var inputId = document.getElementById('vaga-id');
var inputTitulo = document.getElementById('titulo');
var inputEmpresa = document.getElementById('empresa');
var selectArea = document.getElementById('area');
var btnSubmit = document.getElementById('btn-submit');
var btnCancel = document.getElementById('btn-cancel');
var listaVagas = document.getElementById('lista-vagas');
var filtrosContainer = document.getElementById('filters-container');
var titleForm = document.getElementById('form-title');
var tituloListagem = document.getElementById('titulo-listagem');
var btnRoleEstudante = document.getElementById('btn-role-estudante');
var btnRoleEmpresa = document.getElementById('btn-role-empresa');
// Selecionamos as tags dos Modais (HTML5 <dialog>)
var modalCandidatura = document.getElementById('modal-candidatura');
var formCandidatura = document.getElementById('form-candidatura');
var candVagaId = document.getElementById('cand-vaga-id');
var btnFecharCandidatura = document.getElementById('btn-fechar-candidatura');
var modalEmpresa = document.getElementById('modal-empresa');
var listaInscritos = document.getElementById('lista-inscritos');
var btnFecharEmpresa = document.getElementById('btn-fechar-empresa');
// Elementos do Modal de Integrantes
var modalIntegrantes = document.getElementById('modal-integrantes');
var btnAbrirIntegrantes = document.getElementById('btn-abrir-integrantes');
var btnFecharIntegrantes = document.getElementById('btn-fechar-integrantes');
// Elementos dos Modais de Alerta Customizados
var customAlert = document.getElementById('custom-alert');
var alertTitle = document.getElementById('alert-title');
var alertMessage = document.getElementById('alert-message');
var alertIconContainer = document.getElementById('alert-icon-container');
var btnAlertOk = document.getElementById('btn-alert-ok');
var customConfirm = document.getElementById('custom-confirm');
var confirmMessage = document.getElementById('confirm-message');
var btnConfirmOk = document.getElementById('btn-confirm-ok');
var btnConfirmCancel = document.getElementById('btn-confirm-cancel');
// Ícones vetorizados (SVG) guardados em strings para renderizar via JS.
var SVG_SUCCESS = "<div class=\"icon-success\"><svg width=\"56\" height=\"56\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\"></path></svg></div>";
var SVG_ERROR = "<div class=\"icon-danger\"><svg width=\"56\" height=\"56\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z\"></path></svg></div>";
var SVG_INFO = "<div class=\"icon-warning\"><svg width=\"56\" height=\"56\" fill=\"none\" stroke=\"#f59e0b\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"></path></svg></div>";
// ============================================================
// POP-UPS INTELIGENTES (A MAGIA DAS PROMISES)
// ============================================================
// Em vez de usar o velho `alert()`, criamos essa função.
// Ela retorna uma "Promessa". O código inteiro "congela" e espera o usuário apertar o botão "OK".
// Só então a promessa é resolvida (resolve()) e o fluxo volta a andar.
function mostrarAlerta(mensagem, tipo) {
    if (tipo === void 0) { tipo = 'info'; }
    return new Promise(function (resolve) {
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
        var aoClicarOk = function () {
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
    return new Promise(function (resolve) {
        confirmMessage.textContent = mensagem;
        customConfirm.showModal();
        var finalizar = function (resultado) {
            customConfirm.close();
            btnConfirmOk.removeEventListener('click', btnConfirmOkHandler);
            btnConfirmCancel.removeEventListener('click', btnConfirmCancelHandler);
            resolve(resultado);
        };
        var btnConfirmOkHandler = function () { return finalizar(true); };
        var btnConfirmCancelHandler = function () { return finalizar(false); };
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
btnRoleEstudante.addEventListener('click', function () { return setPerfil('estudante'); });
btnRoleEmpresa.addEventListener('click', function () { return setPerfil('empresa'); });
// ============================================================
// FUNÇÕES ÚTEIS
// ============================================================
function formatarData(dataIso) {
    // Lógica simples de formatação: se o dia for "5", transforma em "05"
    var data = new Date(dataIso);
    var dia = String(data.getDate());
    var mes = String(data.getMonth() + 1); // getMonth começa no 0!
    var diaPad = dia.length === 1 ? '0' + dia : dia;
    var mesPad = mes.length === 1 ? '0' + mes : mes;
    return "".concat(diaPad, "/").concat(mesPad, "/").concat(data.getFullYear());
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
    return __awaiter(this, void 0, void 0, function () {
        var resposta, erro_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/vagas')];
                case 1:
                    resposta = _a.sent();
                    return [4 /*yield*/, resposta.json()];
                case 2:
                    vagasGlobal = _a.sent(); // Pega a resposta e transforma em objeto do JavaScript
                    renderVagas(); // Renderiza os "cards" na tela
                    return [3 /*break*/, 4];
                case 3:
                    erro_1 = _a.sent();
                    console.error("Erro de rede. O Node.js tá rodando?", erro_1);
                    listaVagas.innerHTML = '<p class="loading-text">Erro ao conectar com o servidor. O back-end foi iniciado?</p>';
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Quando a empresa clica em "Publicar Vaga"
formVaga.addEventListener('submit', function (evento) { return __awaiter(_this, void 0, void 0, function () {
    var titulo, empresa, area, idEdicao, dados, erro_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                evento.preventDefault(); // Evita a página recarregar sozinha (Comportamento padrão do form)
                titulo = inputTitulo.value.trim();
                empresa = inputEmpresa.value.trim();
                area = selectArea.value;
                idEdicao = inputId.value;
                if (!titulo || !empresa) {
                    mostrarAlerta("O Título e a Empresa não podem estar vazios ou só conter espaços.", "erro");
                    return [2 /*return*/];
                }
                dados = { titulo: titulo, empresa: empresa, area: area };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                if (!idEdicao) return [3 /*break*/, 4];
                // Se houver um idEdicao, significa que é o Modo Edição (PUT)
                return [4 /*yield*/, fetch("/vagas/".concat(idEdicao), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dados)
                    })];
            case 2:
                // Se houver um idEdicao, significa que é o Modo Edição (PUT)
                _a.sent();
                return [4 /*yield*/, mostrarAlerta('Vaga editada com sucesso!', 'sucesso')];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4: 
            // Caso contrário, é criar uma nova vaga (POST)
            return [4 /*yield*/, fetch('/vagas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                })];
            case 5:
                // Caso contrário, é criar uma nova vaga (POST)
                _a.sent();
                return [4 /*yield*/, mostrarAlerta('Nova vaga publicada com sucesso!', 'sucesso')];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                resetarFormulario();
                fetchVagas(); // Recarrega do servidor a lista nova
                return [3 /*break*/, 9];
            case 8:
                erro_2 = _a.sent();
                mostrarAlerta('Erro de conexão ao salvar a vaga.', 'erro');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
// A empresa quer deletar uma vaga.
// (Usamos "window as any" para a função ser lida no "onclick" no HTML).
window.deletarVaga = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var confirmacao, erro_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mostrarConfirm('Tem certeza que deseja excluir esta vaga? Os dados da vaga e candidatos serão apagados.')];
            case 1:
                confirmacao = _a.sent();
                if (!confirmacao)
                    return [2 /*return*/]; // Cai fora se clikou "Cancelar"
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, fetch("/vagas/".concat(id), { method: 'DELETE' })];
            case 3:
                _a.sent();
                return [4 /*yield*/, mostrarAlerta('Vaga excluída permanentemente.', 'sucesso')];
            case 4:
                _a.sent();
                fetchVagas();
                return [3 /*break*/, 6];
            case 5:
                erro_3 = _a.sent();
                mostrarAlerta('Falha ao apagar a vaga no servidor.', 'erro');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
window.prepararEdicao = function (id) {
    // Procura no nosso vetor de vagas qual é a que queremos editar
    var vaga = vagasGlobal.find(function (v) { return v.id === id; });
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
window.abrirModalCandidatura = function (idVaga) {
    candVagaId.value = idVaga; // Guarda a qual vaga ele tá se aplicando escondido no form
    formCandidatura.reset();
    modalCandidatura.showModal();
};
btnFecharCandidatura.addEventListener('click', function () {
    modalCandidatura.close();
});
// Ao clicar em Enviar Candidatura
formCandidatura.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var payload, res, erro_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                payload = {
                    idVaga: candVagaId.value,
                    nomeCandidato: document.getElementById('cand-nome').value,
                    idade: document.getElementById('cand-idade').value,
                    curso: document.getElementById('cand-curso').value,
                    periodo: document.getElementById('cand-periodo').value,
                    email: document.getElementById('cand-email').value,
                    github: document.getElementById('cand-github').value,
                    linkedin: document.getElementById('cand-linkedin').value,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, fetch('/candidaturas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    })];
            case 2:
                res = _a.sent();
                if (!res.ok) return [3 /*break*/, 4];
                modalCandidatura.close();
                return [4 /*yield*/, mostrarAlerta("Sua candidatura voou para a empresa! Boa sorte na entrevista.", "sucesso")];
            case 3:
                _a.sent();
                fetchVagas(); // Atualiza a tela pra dar um 'refresh' no contador de inscritos pra empresa
                return [3 /*break*/, 5];
            case 4:
                mostrarAlerta("Falha: A API recusou os dados. Verifique o preenchimento.", "erro");
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                erro_4 = _a.sent();
                mostrarAlerta("Erro de rede. Node.js caiu?", "erro");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// ============================================================
// PAINEL DE MODERAÇÃO (EMPRESA AVALIANDO ALUNOS)
// ============================================================
window.abrirModalEmpresa = function (idVaga) { return __awaiter(_this, void 0, void 0, function () {
    var resposta, candidatos, erro_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Começa escrevendo "Carregando" na tabela
                listaInscritos.innerHTML = '<tr><td colspan="5">Carregando candidatos pelo Back-end...</td></tr>';
                modalEmpresa.showModal();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("/candidaturas/".concat(idVaga))];
            case 2:
                resposta = _a.sent();
                return [4 /*yield*/, resposta.json()];
            case 3:
                candidatos = _a.sent();
                listaInscritos.innerHTML = '';
                // Se a lista (array) tiver vazia (length = 0)
                if (candidatos.length === 0) {
                    listaInscritos.innerHTML = '<tr><td colspan="5">Poxa, ninguém se inscreveu nesta vaga ainda.</td></tr>';
                    return [2 /*return*/];
                }
                // Se achou galera, usamos um Foreach (laço de repetição) para injetar HTML linha por linha (<tr>)
                candidatos.forEach(function (cand) {
                    var badgeClass = '';
                    if (cand.status === 'Em análise')
                        badgeClass = 'status-analise';
                    else if (cand.status === 'Aprovado')
                        badgeClass = 'status-aprovado';
                    else
                        badgeClass = 'status-rejeitado';
                    var tr = document.createElement('tr');
                    // Injeta variáveis com "Templates Literals" (`${variavel}`) 
                    tr.innerHTML = "\n        <td>\n          <strong>".concat(cand.nomeCandidato, "</strong><br>\n          <small>").concat(cand.idade, " anos | ").concat(cand.email, "</small>\n        </td>\n        <td>").concat(cand.curso, "<br><small>").concat(cand.periodo, "</small></td>\n        <td>\n          <a href=\"").concat(cand.github, "\" target=\"_blank\">GitHub</a>\n          ").concat(cand.linkedin ? "<br><a href=\"".concat(cand.linkedin, "\" target=\"_blank\">LinkedIn</a>") : '', "\n        </td>\n        <td><span class=\"badge-status ").concat(badgeClass, "\">").concat(cand.status, "</span></td>\n        <td>\n          <button class=\"btn-status ap\" onclick=\"mudarStatus('").concat(cand.id, "', 'Aprovado', '").concat(idVaga, "')\">\u2713 Aprovar</button>\n          <button class=\"btn-status rj\" onclick=\"mudarStatus('").concat(cand.id, "', 'Rejeitado', '").concat(idVaga, "')\">\u2715 Rejeitar</button>\n        </td>\n      ");
                    listaInscritos.appendChild(tr); // Gruda a linha na tabela
                });
                return [3 /*break*/, 5];
            case 4:
                erro_5 = _a.sent();
                listaInscritos.innerHTML = '<tr><td colspan="5">Falhou ao ler os dados do banco/array.</td></tr>';
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
window.mudarStatus = function (idCandidatura, novoStatus, idVaga) { return __awaiter(_this, void 0, void 0, function () {
    var confirmacao, erro_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mostrarConfirm("Marcar como ".concat(novoStatus, "? O candidato receberia esse e-mail."))];
            case 1:
                confirmacao = _a.sent();
                if (!confirmacao)
                    return [2 /*return*/];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                // PUT é usado na REST API para Atualizações (Updates)
                return [4 /*yield*/, fetch("/candidaturas/".concat(idCandidatura, "/status"), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: novoStatus })
                    })];
            case 3:
                // PUT é usado na REST API para Atualizações (Updates)
                _a.sent();
                // O status mudou! Chama a tela de tabela de novo para reescrever com as cores atualizadas!
                window.abrirModalEmpresa(idVaga);
                return [3 /*break*/, 5];
            case 4:
                erro_6 = _a.sent();
                mostrarAlerta("Erro ao gravar o novo status.", "erro");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
btnFecharEmpresa.addEventListener('click', function () {
    modalEmpresa.close();
});
// Controle de Abertura/Fechamento do Modal de Integrantes
btnAbrirIntegrantes.addEventListener('click', function () {
    modalIntegrantes.showModal();
});
btnFecharIntegrantes.addEventListener('click', function () {
    modalIntegrantes.close();
});
// ============================================================
// PINTOR DA TELA E FILTRAGEM DE CATEGORIAS
// ============================================================
function renderVagas() {
    listaVagas.innerHTML = '';
    // .filter() é um método do ES6 de Array que exclui o que não bate com a regra
    var vagasFiltradas = vagasGlobal.filter(function (vaga) {
        if (filtroAtual === 'Todos')
            return true; // Mostra geral
        return vaga.area === filtroAtual; // Mostra só 'Backend', 'Frontend', etc
    });
    if (vagasFiltradas.length === 0) {
        listaVagas.innerHTML = '<p class="loading-text">Nenhuma vaga atende ao seu filtro.</p>';
        return;
    }
    // Desenhando os ícones aqui pra não poluir lá embaixo
    var iconeEdit = "<svg width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z\"></path></svg>";
    var iconeTrash = "<svg width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\"></path></svg>";
    vagasFiltradas.forEach(function (vaga) {
        var acoesHtml = '';
        // Regra de Ouro: Estudante clica pra Candidatar. Empresa clica pra Editar.
        if (perfilAtual === 'estudante') {
            acoesHtml = "<button class=\"btn-candidatar\" onclick=\"abrirModalCandidatura('".concat(vaga.id, "')\">Quero essa Vaga!</button>");
        }
        else {
            acoesHtml = "\n        <span class=\"candidatos-count\" onclick=\"abrirModalEmpresa('".concat(vaga.id, "')\">\n          ").concat(vaga.candidatos || 0, " curr\u00EDculos recebidos\n        </span>\n        <div class=\"vaga-actions\">\n          <button class=\"btn-icon\" onclick=\"prepararEdicao('").concat(vaga.id, "')\" title=\"Editar\">").concat(iconeEdit, "</button>\n          <button class=\"btn-icon\" onclick=\"deletarVaga('").concat(vaga.id, "')\" title=\"Excluir\">").concat(iconeTrash, "</button>\n        </div>\n      ");
        }
        var htmlCard = "\n      <article class=\"vaga-item\">\n        <h3 class=\"vaga-title\">".concat(vaga.titulo, "</h3>\n        <p class=\"vaga-empresa\">").concat(vaga.empresa, "</p>\n        <span class=\"vaga-area area-").concat(vaga.area.toLowerCase(), "\">").concat(vaga.area, "</span>\n        \n        <div class=\"vaga-footer\">\n          <span class=\"vaga-date\">").concat(formatarData(vaga.dataCriacao), "</span>\n          ").concat(acoesHtml, "\n        </div>\n      </article>\n    ");
        // Injeta na div do grid como 'último filho'
        listaVagas.insertAdjacentHTML('beforeend', htmlCard);
    });
}
// Ouve os cliques lá em cima nas bolhas de "Filtros"
filtrosContainer.addEventListener('click', function (evento) {
    var botao = evento.target;
    if (botao.classList.contains('filter-btn')) {
        // Remove o botão azul dos outros
        document.querySelectorAll('.filter-btn').forEach(function (btn) { return btn.classList.remove('active'); });
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
