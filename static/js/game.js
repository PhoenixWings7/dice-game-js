// variables declarations
rollBtn = document.getElementById('roll');
firstDice = document.getElementById('dice-1');
secondDice = document.getElementById('dice-2');






//event listeners
rollBtn.addEventListener('click', rollDice);



// functions
function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1,
          dice2 = Math.floor(Math.random() * 6) + 1;
    let sum = dice2 + dice1;
    firstDice.src = `../static/images/${String(dice1)}.png`;
    secondDice.src = `../static/images/${String(dice2)}.png`;
}