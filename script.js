// Função para gerar a frase com base nos campos preenchidos
function gerarFrase() {
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value.toLowerCase();
    let classificacao = document.getElementById("classificacao").value.toLowerCase();
    let descricao = document.getElementById("descricao").value;
    let data = document.getElementById("data").value;
    let horario = document.getElementById("horario").value;
    let local = document.getElementById("local").value;

    // Formatação da data e horário
    let dataTexto = "";
    if (data && horario) {
        dataTexto = `no dia ${new Date(data).toLocaleDateString("pt-BR")} às ${horario}`;
    } else if (data) {
        dataTexto = `no dia ${new Date(data).toLocaleDateString("pt-BR")}`;
    } else if (horario) {
        dataTexto = `no horário de ${horario}`;
    }

    // Descrição da situação
    let fraseDescricao = "";
    if (descricao.toLowerCase().includes("nervoso") || descricao.toLowerCase().includes("atrito")) {
        fraseDescricao = `relatou-se um episódio delicado onde ${descricao.toLowerCase()}`;
    } else {
        fraseDescricao = `foi identificado que ${descricao.toLowerCase()}`;
    }

    // Construindo a frase dependendo dos campos preenchidos
    let frase = `O beneficiário(a) ${nome} é ${tipo} e ${classificacao}, ${fraseDescricao}.`;

    if (local) {
        frase += ` O fato ocorreu em ${local}.`;
    }

    if (dataTexto) {
        frase += ` ${dataTexto}.`;
    }

    // Exibindo a frase gerada no campo resultado
    let resultado = document.getElementById("resultado");
    resultado.textContent = frase;
    resultado.style.background = "#eaf6ff";
    resultado.style.color = "#0056b3";
    resultado.style.border = "1px solid #007bff";

    // Exibindo o botão de copiar
    document.getElementById("copiar").style.display = "block";

    // Adicionando ao histórico
    adicionarAoHistorico(frase);
    salvarHistorico();
}

// Copia a frase para a área de transferência
function copiarFrase() {
    let frase = document.getElementById("resultado").textContent;
    navigator.clipboard.writeText(frase).then(() => {
        let botao = document.getElementById("copiar");
        botao.textContent = "Copiado!";
        botao.style.background = "#ffc107";
        botao.style.color = "#333";
        setTimeout(() => {
            botao.textContent = "Copiar Frase";
            botao.style.background = "#28a745";
            botao.style.color = "white";
        }, 2000);
    });
}

// Adiciona frase ao histórico visual
function adicionarAoHistorico(frase) {
    let historico = document.getElementById("historico");
    let item = document.createElement("li");
    item.textContent = frase;
    historico.insertBefore(item, historico.firstChild);
}

// Limpa todos os campos do formulário
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("classificacao").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";
    document.getElementById("horario").value = "";
    document.getElementById("local").value = "";

    let resultado = document.getElementById("resultado");
    resultado.textContent = "";
    resultado.style.background = "";
    resultado.style.color = "";
    resultado.style.border = "";

    document.getElementById("copiar").style.display = "none";
}

// Salva histórico no localStorage
function salvarHistorico() {
    let historico = [];
    document.querySelectorAll("#historico li").forEach(item => {
        historico.push(item.textContent);
    });
    localStorage.setItem("historicoFrases", JSON.stringify(historico));
}

// Carrega histórico do localStorage
function carregarHistorico() {
    let historico = JSON.parse(localStorage.getItem("historicoFrases")) || [];
    let listaHistorico = document.getElementById("historico");

    historico.forEach(frase => {
        let item = document.createElement("li");
        item.textContent = frase;
        listaHistorico.appendChild(item);
    });
}

// Limpa o histórico visual e localStorage
function limparHistorico() {
    document.getElementById("historico").innerHTML = "";
    localStorage.removeItem("historicoFrases");
}

// Carrega histórico automaticamente ao abrir a página
window.onload = function () {
    carregarHistorico();
};

// Função para verificar a classificação e exibir/ocultar explicações
function verificarClassificacao() {
    const classif = document.getElementById('classificacao').value;
    document.getElementById('explicacaoFlags').style.display = classif === 'Reclama' ? 'block' : 'none';
    document.getElementById('alertaRapido').style.display = classif === 'Atendimento Rápido' ? 'block' : 'none';
}

// Função para mostrar o exemplo da descrição quando o usuário começa a digitar
function mostrarExemplo() {
    const desc = document.getElementById('descricao').value;
    const exemplo = document.getElementById('exemploDescricao');
    exemplo.style.display = desc.length > 0 ? 'block' : 'none';
}

// Validação do formulário antes de gerar a frase
function validarFormulario() {
    const campos = document.querySelectorAll('.obrigatorio');
    let valido = true;

    campos.forEach(campo => {
        if (!campo.value.trim()) {
            campo.style.border = '2px solid red';
            valido = false;
        } else {
            campo.style.border = '';
        }
    });

    if (!valido) {
        alert("Por favor, preencha todos os campos obrigatórios!");
    } else {
        gerarFrase();
    }
}