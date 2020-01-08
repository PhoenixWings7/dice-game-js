// variables declarations
const rollBtn = document.getElementById('roll');
const firstDice = document.getElementById('dice-1');
const secondDice = document.getElementById('dice-2');
let globalScore1;
let globalScore2;

let changeActivePlayer = (function () {
    let activePlayerNum = 1;
    return function (doChange) {
        if (doChange) {
            if (activePlayerNum === 1) {
                activePlayerNum = 2;
            }
            else {
                activePlayerNum = 1;
            }

        }
        return activePlayerNum;
    }
})();


//creating addToGlobalScore as a function and immiediately calling (invoking) it so it can become an inner function
//because of closures
let addToGlobalScore1 = (function () {
    let globalScore1 = 0;
    return function () {

    }
}) ();





//event listeners
document.addEventListener('DOMContentLoaded', gameInit);
rollBtn.addEventListener('click', rollDice);



// functions
function rollDice() {
    let activePlayerNum = changeActivePlayer(false);
    const currentScore = document.getElementById(`round-score-${activePlayerNum}`);
    const dice1 = Math.floor(Math.random() * 6) + 1,
          dice2 = Math.floor(Math.random() * 6) + 1;
    // console.log(currentScore.textContent);
    currentScore.textContent = parseInt(currentScore.textContent, 10) + dice1 + dice2;
    firstDice.src = `../static/images/${String(dice1)}.png`;
    secondDice.src = `../static/images/${String(dice2)}.png`;
    activePlayerNum = changeActivePlayer(true);
}