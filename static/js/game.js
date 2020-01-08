// variables declarations
const rollBtn = document.getElementById('roll');
const standBtn = document.getElementById('stand');
const firstDice = document.getElementById('dice-1');
const secondDice = document.getElementById('dice-2');


//creating addToGlobalScore as a function and immediately calling (invoking) it so it can become an inner function
//and use private variables stored in memory somewhere because of closures
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


//creating changeActivePlayer as a function and immediately calling (invoking) it so it can become an inner function
//and use private variables stored in memory somewhere because of closures
//changeActivePlayer takes args doChange, points (default=0) and returns active player if doChange=false or adds to score
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


//creating addToCurrentScore as a function and immediately calling (invoking) it so it can become an inner function
//and use private variables stored in memory somewhere because of closures
//function takes args doAdd (adds to currentScore if true), resetCurrentScore (resets score if true) and points
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


//creating stand as a function to perform a few actions when user clicks 'stand' button
//gets current points, adds them to global user score, resets them and changes score on the page
function stand() {
    let points = addToCurrentScore(false, false);
    let activePlayer = changeActivePlayer(false);

    changeActivePlayer(true, points);
    addToCurrentScore(false, true);

    //change global score on the page
    let playerScore = addToGlobalScore(false, activePlayer, points);
    let playerScoreDOM = document.getElementById(`total-score-${activePlayer}`);
    playerScoreDOM.textContent = playerScore;
}


//event listeners
rollBtn.addEventListener('click', rollDice);
standBtn.addEventListener('click', stand);



//
function rollDice() {
    //define all needed variables or constants
    let activePlayerNum = changeActivePlayer(false);
    let currentScore = addToCurrentScore(false, false);
    const currentScoreDOM = document.getElementById(`round-score-${activePlayerNum}`);
    const dice1 = Math.floor(Math.random() * 6) + 1,
          dice2 = Math.floor(Math.random() * 6) + 1;
    let additionalPoints = dice1 + dice2;

    //change current score on the page and in current score private function
    currentScoreDOM.textContent = currentScore + additionalPoints;
    addToCurrentScore(true, false, additionalPoints);
    //change dices' pictures
    firstDice.src = `../static/images/${String(dice1)}.png`;
    secondDice.src = `../static/images/${String(dice2)}.png`;
}