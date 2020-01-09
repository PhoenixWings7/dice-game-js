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
        //get active player and score element from DOM to change it's content
        let activePlayerNum = changeActivePlayer(false);
        const currentScoreDOM = document.getElementById(`round-score-${activePlayerNum}`);
        currentScoreDOM.textContent = currentScore;
        return currentScore;
    }
})();


//creating stand as a function to perform a few actions when user clicks 'stand' button
//gets current points, adds them to global user score, resets them and changes score on the page
function stand() {
    //get current round score points
    let points = addToCurrentScore(false, false);
    //get active player
    let activePlayer = changeActivePlayer(false);

    //reset player's current score
    addToCurrentScore(false, true);
    //change player and add points to his/hers global score
    changeActivePlayer(true, points);
    //reset the other player's current score
    addToCurrentScore(false, true);

    //change global score on the page
    let playerScore = addToGlobalScore(false, activePlayer, points);
    let playerScoreDOM = document.getElementById(`total-score-${activePlayer}`);
    playerScoreDOM.textContent = playerScore;
}


//event listeners
rollBtn.addEventListener('click', rollDice);
standBtn.addEventListener('click', stand);


function checkRules(dice1, dice2) {
    if ((dice1 == 3) || (dice2 == 3)) {
        //reset both player current scores and change player
        addToCurrentScore(false, true);
        changeActivePlayer(true);
        addToCurrentScore(false, true);
        return 0;
    }
    else if (dice1 == dice2) {
        //reset both player current scores and change player
        addToCurrentScore(false, true);
        changeActivePlayer(true);
        addToCurrentScore(false, true);
        return 0;
    }
    else if (Math.abs(dice1-dice2) == 1) {
        //double the points and return them
        return (dice1 + dice2) * 2;
    }
    else {
        //return points sum if nothing special happens
        return dice1+dice2;
    }
}


//
function rollDice() {
    //define all needed variables or constants
    const dice1 = Math.floor(Math.random() * 6) + 1,
          dice2 = Math.floor(Math.random() * 6) + 1;

    //change dices' pictures
    firstDice.src = `../static/images/${String(dice1)}.png`;
    secondDice.src = `../static/images/${String(dice2)}.png`;
    //check rules and get point sum
    let points = checkRules(dice1, dice2);
    //change current score on the page and in current score private function
    addToCurrentScore(true, false, points);
}