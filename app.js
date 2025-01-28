// Função para gerar número aleatório entre 1 e 100
function gerarNumeroAleatorio() {
    return parseInt(Math.random() * 100 + 1);
}

// Variável com o número secreto
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para exibir texto na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Inicializa o jogo com mensagens iniciais
exibirTextoNaTela("h1", "Jogo da Adivinhação");
exibirTextoNaTela(".texto__paragrafo", "Escolha um número entre 1 e 100.");

// Função para verificar o palpite do jogador
function verificarPalpite() {
    // Obtém o valor do input
    let palpite = document.querySelector(".container__input").value;
    palpite = parseInt(palpite); // Garante que seja um número

    if (isNaN(palpite)) {
        // Exibe mensagem de erro se o input não for um número válido
        exibirTextoNaTela(".texto__paragrafo", "Por favor, insira um número válido entre 1 e 100.");
        return;
    }

    // Exibe no console para debug
    console.log("Palpite recebido:", palpite);

    // Compara o palpite com o número secreto
    if (palpite === numeroSecreto) {
        exibirTextoNaTela("h1", "ACERTOU!!!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela(".texto__paragrafo", mensagemTentativa);
        finalizarJogo();
    } else if (palpite > numeroSecreto) {
        exibirTextoNaTela(".texto__paragrafo", "O número secreto é menor.");
    } else {
        exibirTextoNaTela(".texto__paragrafo", "O número secreto é maior.");
 // Incrementa o número de tentativas
    tentativas++;
    limpaCampo();
    }
    
}
//Função para limpar o Campo de digitação=
function limpaCampo (){
    palpite = document.querySelector('input');
    palpite.value = ''
}
// Função para finalizar o jogo e habilitar o botão de reinício
function finalizarJogo() {
    document.querySelector("#reiniciar").disabled = false; // Habilita o botão "Novo jogo"
    document.querySelector(".container__input").disabled = true; // Desabilita o input
    document.querySelector(".container__botao").disabled = true; // Desabilita o botão "Palpite"
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    tentativas = 1; // Reseta o número de tentativas
    document.querySelector("#reiniciar").disabled = true; // Desabilita o botão "Novo jogo"
    document.querySelector(".container__input").disabled = false; // Habilita o input
    document.querySelector(".container__botao").disabled = false; // Habilita o botão "Palpite"
    document.querySelector(".container__input").value = ""; // Limpa o input
    exibirTextoNaTela("h1", "Jogo da Adivinhação");
    exibirTextoNaTela(".texto__paragrafo", "Escolha um número entre 1 e 100.");
}

// Conecta o botão "Novo jogo" à função de reinício
document.querySelector("#reiniciar").addEventListener("click", reiniciarJogo);
