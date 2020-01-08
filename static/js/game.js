// variables declarations
const rollBtn = document.getElementById('roll');
const standBtn = document.getElementById('stand');
const firstDice = document.getElementById('dice-1');
const secondDice = document.getElementById('dice-2');


//creating addToGlobalScore as a function and immiediately calling (invoking) it so it can become an inner function
//because of closures
//addToGlobalScore takes arguments doAdd (true or false), playerNum, points
let addToGlobalScore = (function () {
    let globalScore1 = 0;
    let globalScore2 = 0;
    return function (doAdd, playerNum, points) {
        if (doAdd) {
            if (playerNum === 1) {
                globalScore1 += points;
            }
            else {
                globalScore2 += points;
            }
        }
        else {
            if (playerNum === 1) {
                return globalScore1;
            }
            else {
                return globalScore2;
            }
        }
    }
}) ();


let changeActivePlayer = (function () {
    let activePlayerNum = 1;
    return function (doChange, points = 0) {
        if (doChange) {
            addToGlobalScore(true, activePlayerNum, points);
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


let addToCurrentScore = (function () {
    let currentScore = 0;
    return function (doAdd, resetCurrentScore, points=0) {
        if (resetCurrentScore) {
            currentScore = 0;
        }
        if (doAdd) {
            currentScore += points;
        }
        return currentScore;
    }
})();

let stand = (function () {
    let currentScore = 0;
    return function () {
        let points = addToCurrentScore(false, false);
        let activePlayer = changeActivePlayer(false);
        changeActivePlayer(true, points);
        addToCurrentScore(false, true);
        let playerScore = addToGlobalScore(false, activePlayer, points);
        let playerScoreDOM = document.getElementById(`total-score-${activePlayer}`);
        playerScoreDOM.textContent = playerScore;
    }
})();



//event listeners
rollBtn.addEventListener('click', rollDice);
standBtn.addEventListener('click', stand);



// functions
function rollDice() {
    let activePlayerNum = changeActivePlayer(false);
    let currentScore = addToCurrentScore(false, false);
    const currentScoreDOM = document.getElementById(`round-score-${activePlayerNum}`);
    const dice1 = Math.floor(Math.random() * 6) + 1,
          dice2 = Math.floor(Math.random() * 6) + 1;
    // console.log(currentScore.textContent);
    let additionalPoints = dice1 + dice2;
    currentScoreDOM.textContent = currentScore + additionalPoints;
    addToCurrentScore(true, false, additionalPoints);
    firstDice.src = `../static/images/${String(dice1)}.png`;
    secondDice.src = `../static/images/${String(dice2)}.png`;
}
// activePlayerNum = changeActivePlayer(true, points);
