const JOGADORES = {
    PLAYER: 'player',
    MAQUINA: 'machine'
}

//Captura os elementos e os salva em variaveis
let inputUsu = document.querySelector("#numUsu");
let elPlacar = {
    machine: document.querySelector("#totalMachine"),
    player: document.querySelector("#totalPlayer")
}
let btnJogar = document.querySelector("#btnJogar");
let result = document.querySelector("#result");
let btnReiniciar = document.querySelector("#btnReiniciar");
let campoNumMaquina = document.querySelector('#campoNumMaquina');

//Declara variaveis a serem usadas depois
let numMaquina = null;
let soma = null;
let resto = null;
let countPlacar = {
    machine: parseInt(localStorage[JOGADORES.MAQUINA]) || 0,
    player: parseInt(localStorage[JOGADORES.PLAYER]) || 0
}

//#region Score Updater

const mostrarNumMaquina = (numMaquina) => {
    campoNumMaquina.innerHTML = 'O numero da maquina foi: ' + numMaquina;
}

// Atualizar Elemento placar
const atualizarElPlacar = (jogadores) => {
    for (let jogador of jogadores) {
        elPlacar[jogador].innerHTML = countPlacar[jogador]
    }
}

// Aumentar variável count placar
const aumentarCountPlacar = (jogador) => {
    countPlacar[jogador]++
    atualizarElPlacar([jogador])
}

// Atualizar local storage com valores de countPlacar
const atualizarLocalStorage = () => {
    for (let nomeJogador in JOGADORES) {
        localStorage[JOGADORES[nomeJogador]] = countPlacar[JOGADORES[nomeJogador]]
    }
}

const atualizarPlacar = jogador => {
    aumentarCountPlacar(jogador)
    atualizarLocalStorage(jogador)
}
//#endregion

//#region Score Resetter

const resetPlacar = () => {
    for (let jogador in countPlacar) {
        countPlacar[jogador] = 0
    }
    atualizarElPlacar(Object.keys(countPlacar))
}

const resetLocalStorage = () => {
    localStorage.clear()
}

const resetNumMaquina = () => {
    campoNumMaquina.innerHTML = '';
}

const clearUserInput = () => {
    inputUsu.value = null
}

const limparPlacar = () => {
    resetPlacar()
    resetLocalStorage()
    clearUserInput()
    resetNumMaquina()
}
//#endregion

// Carregando os elementos de placar com os dados do local storage
// Os dados do local storage são carregados na inicialização de countPlacar
atualizarElPlacar(Object.values(JOGADORES))

//evento responsavel pelo jogo em si
btnJogar.addEventListener("click", function (e) {
    e.preventDefault();
    numMaquina = parseInt(Math.random() * 10);
    let numPlayer = parseInt(inputUsu.value);
    if (numPlayer == "") {
        alert("Informe um Numero");
    } else {
        soma = numPlayer + numMaquina;
        console.log(soma);
        resto = soma % 2;
        let vencedor = resto == 0 ? JOGADORES.PLAYER : JOGADORES.MAQUINA
        
        mostrarNumMaquina(numMaquina);
        atualizarPlacar(vencedor)
        clearUserInput()
    }
});

//Evento responsavel por reiniciar
btnReiniciar.addEventListener("click", function (e) {
    e.preventDefault();

    limparPlacar()
});