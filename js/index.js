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

//Declara variaveis a serem usadas depois
let numMaquina = null;
let soma = null;
let resto = null;
let countPlacar = {
    machine: parseInt(localStorage[JOGADORES.MAQUINA]) || 0,
    player: parseInt(localStorage[JOGADORES.PLAYER]) || 0
}


// Funções de atualização do placar
const atualizarElPlacar = (jogador) => {
    elPlacar[jogador].innerHTML = countPlacar[jogador]
}

const atualizarCountPlacar = ({ vencedores }) => {
    for (let vencedor of vencedores) {
        countPlacar[vencedor]++
        atualizarElPlacar(vencedor)
    }
}

// Carregando os elementos de placar com os dados do local storage
for (let jogador in JOGADORES) atualizarElPlacar(JOGADORES[jogador])

const atualizarLocalStorage = () => {
    for (let nomeJogador in JOGADORES) {
        localStorage[JOGADORES[nomeJogador]] = countPlacar[JOGADORES[nomeJogador]]
    }
}

// Definição do objeto atualizador do placar
const createScoreUpdater = () => {
    var observers = []

    function subscribe(observer) {
        observers.push(observer)
    }
    function notifyAll(data) {
        for (let observerFunction of observers)
            observerFunction(data)
    }

    function update(action) {
        notifyAll(action)
    }

    return {
        subscribe,
        update
    }
}

const scoreUpdater = createScoreUpdater()
scoreUpdater.subscribe(atualizarCountPlacar)
scoreUpdater.subscribe(atualizarLocalStorage)

//evento responsavel pelo jogo em si
btnJogar.addEventListener("click", function (e) {
    e.preventDefault();
    numMaquina = parseInt(Math.random() * 10);
    let numPlayer = inputUsu.value;
    if (numPlayer == "") {
        alert("Informe um Numero");

    } else {

        soma = numPlayer + numMaquina;
        resto = soma % 2;
        let vencedor = resto == 0 ? JOGADORES.PLAYER : JOGADORES.MAQUINA

        let comando = {
            vencedores: [vencedor]
        }

        scoreUpdater.update(comando);
    }
});

//Evento responsavel por reiniciar
btnReiniciar.addEventListener("click", function (e) {
    e.preventDefault();
    
    localStorage.clear()

    inputUsu.value = "";
    result.innerHTML = "";
});