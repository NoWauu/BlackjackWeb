let nbPoints = 0;
let mainBloquee = false;
let gameStatus = "early";

const joueurs = {
    "banque": {
        main: [],
        pointsMain: 0,
        pointsPartie: 0
    },
    "Joueur 1": {
        main: [],
        pointsMain: 0,
        pointsPartie: 0
    }
}


// Création du paquet de carte
const cards = [];
for(const color of ["pique", "coeur", "carreau", "trefle"]) {
    for (let i=0; i<=12; ++i) {
        cards.push(`${integerToWord(i)}-${color}`);
    }
}

function integerToWord(num) {
    switch(num) {
        case 0:
            return "2-deux";
        case 1:
            return "3-trois";
        case 2:
            return "4-quatre";
        case 3:
            return "5-cinq";
        case 4:
            return "6-six";
        case 5:
            return "7-sept";
        case 6:
            return "8-huit";
        case 7:
            return "9-neuf";
        case 8:
            return "10-dix";
        case 9:
            return "10-valet";
        case 10:
            return "10-dame";
        case 11:
            return "10-roi";
        case 12:
            return "11-as";
        default:
            return "";
    }
}
//

document.getElementById("draw").addEventListener('click', function() {
    drawCard(joueurs["Joueur 1"]);
    drawCard(joueurs.banque);
});
document.getElementById("start").addEventListener('click', startRound);
document.getElementById("lock").addEventListener('click', lockCards);

function drawCard(joueur) {
    if(gameStatus !== "playing") return;
    if(mainBloquee) return;

    let card = Math.floor(Math.random() * 52);
    joueur.main.push(cards[card]);
    joueur.pointsMain = countPoints(joueur)

    document.getElementById("player-hand").textContent = joueurs["Joueur 1"].main;
    document.getElementById("player-points").textContent = joueurs["Joueur 1"].pointsMain;

    document.getElementById("dealer-hand").textContent = joueurs.banque.main;
    document.getElementById("dealer-points").textContent = joueurs.banque.pointsMain;
    
    if (joueur.pointsMain > 21) {
        console.log("La partie est perdue");
        mainBloquee = true;
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
    console.log("Début de la partie");


    Object.entries(joueurs).forEach(([key, _]) => {
        joueurs[key].main = [];
        joueurs[key].pointMain = 0;
    });

    for(let i = 0; i < 2; ++i) {
        Object.entries(joueurs).forEach( ([k, _])=> {
            drawCard(joueurs[k]);
        });
    }

    console.log("C'est à vous de jouer")
}

function lockCards() {
    mainBloquee = true;
    console.log("Vous avez bloqué votre main");
}