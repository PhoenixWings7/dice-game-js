// variables declarations
let activePlayer, roundScore, globalScore, gamePlaying;

const standBtn = document.getElementById('stand');
const rollBtn = document.getElementById('roll');
const firstDice = document.getElementById('dice-1');
const secondDice = document.getElementById('dice-2');


//event listeners
document.addEventListener('DOMContentLoaded', gameInit);
rollBtn.addEventListener('click', rollDice);
standBtn.addEventListener('click', addGlobalScore);


// functions
function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1,
     dice2 = Math.floor(Math.random() * 6) + 1;

     if (dice2 === 3 || dice1 === 3) {
        nextPlayer();
     } else if (Math.abs(dice1 - dice2) === 1) {
         roundScore += 2*(dice1 + dice2);
         updateRoundScore(dice1, dice2, roundScore);
     }else if (dice2 === dice1) {
         nextPlayer()
     } else {
         roundScore += (dice1 + dice2);
         updateRoundScore(dice1, dice2, roundScore);
     }



}
function gameInit() {
    activePlayer = 1;
    roundScore = 0;
    globalScore = [0, 0];
    gamePlaying = true;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('round-score-1').textContent = 0;
    document.getElementById('round-score-2').textContent = 0;
    document.getElementById('total-score-1').textContent = 0;
    document.getElementById('total-score-2').textContent = 0;
}

function addGlobalScore() {
    if (gamePlaying){
        globalScore[activePlayer-1] += roundScore;

        // show the global score values on the user interface
        document.getElementById(`total-score-${activePlayer}`).textContent = globalScore[activePlayer-1];

        // winning condition
        if (globalScore[activePlayer-1] >= 100) {
            gamePlaying = false;

        }else   {
            nextPlayer();
        }
    }
}

function nextPlayer() {
        roundScore = 0;
        activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.getElementById('round-score-1').textContent = 0;
        document.getElementById('round-score-2').textContent = 0;
    }

function updateRoundScore(dice1, dice2, roundScore) {
     firstDice.style.display = 'block';
     secondDice.style.display = 'block';
     firstDice.src = `../static/images/${String(dice1)}.png`;
     secondDice.src = `../static/images/${String(dice2)}.png`;
     document.getElementById(`round-score-${activePlayer}`).textContent = roundScore;
}