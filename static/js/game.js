// variables declarations
const rollBtn = document.getElementById('roll');
const firstDice = document.getElementById('dice-1');
const secondDice = document.getElementById('dice-2');
let activePlayer ;







//event listeners
document.addEventListener('DOMContentLoaded', gameInit);
rollBtn.addEventListener('click', rollDice);



// functions
function rollDice() {
    console.log(activePlayer);
    const currentScore = document.getElementById(`round-score-${activePlayer}`);
    const dice1 = Math.floor(Math.random() * 6) + 1,
          dice2 = Math.floor(Math.random() * 6) + 1;
    // console.log(currentScore.textContent);
    currentScore.textContent = parseInt(currentScore.textContent, 10) + dice1 + dice2;
    firstDice.src = `../static/images/${String(dice1)}.png`;
    secondDice.src = `../static/images/${String(dice2)}.png`;
}
function gameInit() {
    activePlayer = 1;
}