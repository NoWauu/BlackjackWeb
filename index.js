let nbPoints = 0;
let mainBloquee = false;

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
});
document.getElementById("start").addEventListener('click', startRound);
document.getElementById("lock").addEventListener('click', lockCards);

function drawCard(joueur) {
    if(mainBloquee) return;
    let card = Math.floor(Math.random() * 52);
    joueur.main.push(cards[card]);
    joueur.pointsMain = countPoints(joueur)
    document.getElementById("player-hand").textContent = joueurs["Joueur 1"].main;
    document.getElementById("player-points").textContent = joueurs["Joueur 1"].pointsMain;
}   

function countPoints(joueur) {
    let points = 0;
    joueur.main.forEach(card => {
        points += parseInt(card);
    });
    return points;
}

function startRound() {
    console.log("Début de la partie");

    joueurs["banque"].main = [];
    joueurs["Joueur 1"].main = [];
    joueurs["banque"].pointsMain = 0;
    joueurs["Joueur 1"].pointsMain = 0;

    console.log("La banque vous distribue une carte");
    drawCard(joueurs["Joueur 1"]);

    console.log("La banque se distribue une carte");
    drawCard(joueurs["banque"]);

    console.log("La banque vous distribue une carte");
    drawCard(joueurs["Joueur 1"]);

    console.log("La banque se distribue une carte");
    drawCard(joueurs["banque"]);

    console.log("Main JOUEUR : ")
    joueurs["Joueur 1"].main.forEach(card => {
        console.log(card);
    });
    console.log(joueurs["Joueur 1"].pointsMain);
    
    console.log("Main BANQUE : ")
    joueurs["banque"].main.forEach(card => {
        console.log(card);
    });
    console.log(joueurs["banque"].pointsMain);

    console.log("C'est à vous de jouer")

    
}

function lockCards() {
    mainBloquee = true;
    console.log("Vous avez bloqué votre main");
}