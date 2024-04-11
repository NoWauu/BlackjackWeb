let nbPoints = 0;
let mainBloquee = false;
let gameStatus = "early";

const joueurs = {
    "banque": {
        main: [],
        pointsMain: 0,
        pointsPartie: 0
    },
    "player1": {
        main: [],
        pointsMain: 0,
        pointsPartie: 0
    }
}


// Création du paquet de carte
function fillDeck() {
    let cards = [];
    for(const color of ["spades", "hearts", "diamonds", "clubs"]) {
        for (let i=0; i<=12; ++i) {
            cards.push(`${integerToWord(i)}-${color}`);
        }
    }
    return cards;
}

let cards = fillDeck();


function integerToWord(num) {
    switch(num) {
        case 0:
            return "2-two";
        case 1:
            return "3-three";
        case 2:
            return "4-four";
        case 3:
            return "5-five";
        case 4:
            return "6-six";
        case 5:
            return "7-seven";
        case 6:
            return "8-eight";
        case 7:
            return "9-nine";
        case 8:
            return "10-ten";
        case 9:
            return "10-jack";
        case 10:
            return "10-queen";
        case 11:
            return "10-king";
        case 12:
            return "11-ace";
        default:
            return "";
    }
}

function getCardImg(cardName) {
    let c = cardName.split("-");
    
    return `${c[1]}_of_${c[2]}.svg`;
}

//
document.getElementById("draw").addEventListener('click', function() {
    drawCard("player1", joueurs["player1"]);
});
document.getElementById("start").addEventListener('click', startRound);
document.getElementById("lock").addEventListener('click', lockCards);
document.getElementById("draw").style.opacity = 0;
document.getElementById("draw").disabled = true;
document.getElementById("lock").style.opacity = 0;
document.getElementById("lock").disabled = true;

function drawCard(nom, joueur) {
    if(gameStatus !== "playing") return;
    if(mainBloquee) return;

    let card = Math.floor(Math.random() * cards.length);
    console.log(card);
    console.log(cards[card]);
    console.log(getCardImg(cards[card]));
    joueur.main.push(cards[card]);
    joueur.pointsMain = countPoints(joueur)
/*
    document.getElementById("player-hand").textContent = joueurs["Joueur 1"].main;
    document.getElementById("player-points").textContent = joueurs["Joueur 1"].pointsMain;

    document.getElementById("dealer-hand").textContent = joueurs.banque.main;
    document.getElementById("dealer-points").textContent = joueurs.banque.pointsMain;
    */


    let newCard = document.createElement("img");
    newCard.src = `images/${getCardImg(cards[card])}`;
    newCard.className = "card";
    if (nom === "banque") {
        newCard.classList.add("cover");
    }

    document.getElementById(nom + `-hand`).append(newCard);

    if (joueur.pointsMain > 21) {
        console.log("La partie est perdue");
        mainBloquee = true;
    }

    cards.splice(card, 1);
    if(cards.length == 0){
        cards = fillDeck();
    }
}

function countPoints(joueur) {
    let points = 0;
    joueur.main.forEach(card => {
        points += parseInt(card);
    });
    return points;
}

function startRound() {
    gameStatus = "playing";
    mainBloquee = false;
    document.getElementById("start").style.opacity = 0;
    document.getElementById("start").disabled = true;
    document.getElementById("draw").style.opacity = 1;
    document.getElementById("draw").disabled = false;
    document.getElementById("lock").style.opacity = 1;
    document.getElementById("lock").disabled = false;
    console.log("Début de la partie");


    Object.entries(joueurs).forEach(([key, _]) => {
        joueurs[key].main = [];
        joueurs[key].pointMain = 0;
    });

    for(let i = 0; i < 2; ++i) {
        Object.entries(joueurs).forEach(([k, _])=> {
            drawCard(k, joueurs[k]);
        });
    }

    console.log("C'est à vous de jouer")
}

function lockCards() {
    mainBloquee = true;
    console.log("Vous avez bloqué votre main");
}