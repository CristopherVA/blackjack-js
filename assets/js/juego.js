/**
 * 2C = Two of Clubs (Treboles)
 * 2D Two Of Diamind (Diamantes)
 * 2H Two Of Hears (Corazones)
 * 2S Two Of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntoJugador = 0,
    puntoComputadora = 0;

//referencia html
const  buttonGetCard = document.querySelector('#get-card');
const buttonNewGame =  document.querySelector('#new-game');
const buttonStop =  document.querySelector('#stop');
const divCartaJugador = document.querySelector('#jugador-carta');
const divCartaComputadora = document.querySelector('#computadora-carta');

let puntoHTML = document.querySelectorAll('small');

const crearDesk = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
 
    deck = _.shuffle(deck)
    return deck
}

crearDesk();

const pedirCarta = () => {

    if(deck.length == 0)  {
        throw "No hay carta en el deck";
    }

    const carta = deck.pop()
    return carta

}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length -1)

    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}

// TURNO DE LA COMPUTADORA
const turnoComputadora = (puntoMinumos) => {
    do{
        const carta = pedirCarta()
        puntoComputadora = puntoComputadora + valorCarta(carta);
        puntoHTML[1].innerText = puntoComputadora

        const imgCarta = document.createElement('img')
        imgCarta.src=`./assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartaComputadora.append(imgCarta)

        if(puntoMinumos > 21){
            break;
        }

    } while(puntoComputadora < puntoMinumos && (puntoMinumos <= 21) )
    
    setTimeout(() => {
        if(puntoComputadora === puntoJugador){
            alert('Nadie gana :(')
        } else if(puntoMinumos > 21) {
            alert('Maquina Gana')
        } else if(puntoComputadora > 21){
            alert('Jugador Gana :)')
        } else {
            alert('Maquina Gana')
        }
    }, 100);
}


// EVENTOS

buttonGetCard.addEventListener('click', () => {
    const carta = pedirCarta()
    console.log(carta)
    puntoJugador = puntoJugador + valorCarta(carta);
    puntoHTML[0].innerText = puntoJugador

    const imgCarta = document.createElement('img')
    imgCarta.src=`./assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartaJugador.append(imgCarta)
    
    if(puntoJugador > 21){
        buttonGetCard.disabled = true;
        buttonStop.disabled = true;
        turnoComputadora(puntoJugador)
        
    } else if(puntoJugador === 21){
        buttonGetCard.disabled = true;
        buttonStop.disabled = true;
        turnoComputadora(puntoJugador)
    }

})

buttonStop.addEventListener('click', () => {
    buttonGetCard.disabled = true;
    buttonStop.disabled = true;
    turnoComputadora(puntoJugador);
})

buttonNewGame.addEventListener('click', () => {
    deck = [];
    deck = crearDesk();
    puntoComputadora = 0;
    puntoJugador = 0;
    puntoHTML[0].innerText = 0;
    puntoHTML[1].innerText = 0;
;
    divCartaComputadora.innerHTML = '';
    divCartaJugador.innerHTML = '';

    buttonGetCard.disabled =  false;
    buttonStop.disabled = false;
})

