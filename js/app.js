/*------Constants------*/
const game = {
    title: 'Guess the Number!',
    biggestNum: 100,
    smallestNum: 1,
    secretNum: null,
    correctGuess: false,
    prevGuesses: [],
    message: 'Please enter a number between 1 and 100!',
    userGuess: null,
};

/*------Variables------
title
biggestNum
smallestNum
secretNum
correctGuess
prevGuess
message
userGuess
------Variables------*/

/*------Cached Element References------*/
const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const guessInput = document.getElementById('guessInput');
const titleEl = document.querySelector('h1')
//Question
resetBtn.addEventListener('click', () => game.play());
guessBtn.addEventListener('click', guessButtonListener)
guessInput.addEventListener('keydown', (e) => guessInputListener(e));

/*------Methods------*/
game.play = function () {
    titleEl.className = '';
    messageEl.className = '';
    guessesEl.innerText = '';
    messageEl.innerText = this.message
    guessInput.value = '';
    this.correctGuess = false;
    this.prevGuesses = [];
    this.secretNum = Math.floor(Math.random() * (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
    console.log(this.secretNum);
}

game.play()

game.validate = function (userGuess) {
    let { prevGuesses, message, checkGuess, smallestNum, biggestNum, correctGuess } = this
    if (!correctGuess) {
        let validGuess;
        messageEl.className = '';

        guessInput.value = ''

        //Checking to make sure the user's guess is a number
        isNaN(userGuess) ? validGuess = false : validGuess = true

        if (!validGuess) {
            message = `Please enter numbers only!`
            messageEl.innerText = message
            messageEl.className = 'warning animated bounce'
            return
        }

        //Validating if the users guess is between biggestNum and smallestNum
        userGuess < 1 || userGuess > 100 ? validGuess = false : validGuess = true
        if (!validGuess) {
            message = `Please enter numbers between ${smallestNum} and ${biggestNum} only!`
            messageEl.innerText = message
            messageEl.className = 'warning animated bounce'
            return
        }

        //Checking if the user has already guessed the number
        prevGuesses.includes(userGuess) ? validGuess = false : validGuess = true
        if (!validGuess) {
            message = `You've already entered the number ${userGuess}, try again!`
            messageEl.innerText = message
            messageEl.className = 'warning animated bounce'
            return
        }

        //Pushing only if the guess is valid
        prevGuesses.push(userGuess)
        checkGuess(userGuess)
        render(userGuess)
    }
}

game.checkGuess = function (userGuess) {
    guessInput.value = ''
    //question refer to line 45
    let { secretNum, message, prevGuesses } = game
    if (userGuess === secretNum) {
        // Adding this single line of code will cause confetti to fall for 1.5 seconds on a correct guess!
        confetti.start(1500);
        titleEl.className = 'animated bounce'

        if (prevGuesses.length === 1) {
            message = `You guessed the number ${secretNum} in ${prevGuesses.length} guess!`
        } else {
            message = `You guessed the number ${secretNum} in ${prevGuesses.length} guesses!`
        }
        game.correctGuess = true
        messageEl.innerText = message
        messageEl.className = 'winner'
    } else if (userGuess < secretNum) {
        message = `Your guess ${userGuess} is too Low`
        messageEl.innerText = message
        messageEl.className = 'low'
    } else if (userGuess > secretNum) {
        message = `Your guess ${userGuess} is too High`
        messageEl.innerText = message
        messageEl.className = 'high'
    }
}

/*------Functions------*/
function guessButtonListener() {
    if (game.prevGuesses.length === 0) {
        guessesEl.innerText = 'Previous Guesses:'
    }
    if (!game.correctGuess) {
        game.userGuess = Number(guessInput.value)
        game.validate(game.userGuess)
    }
}

function render(guess) {
    let { secretNum, prevGuesses } = game
    const guessDivs = document.querySelectorAll('.guessDiv')
    for (div of guessDivs) {
        let comparison = Number(div.innerText)
        if (comparison !== guess) {
            guessesEl.removeChild(div)
        }
    }

    for (let i = prevGuesses.length; i >= 0; i--) {
        let guess = prevGuesses[i]
        if (guess > secretNum) {
            let div = document.createElement("div");
            div.innerText = guess;
            div.className = 'guessDiv high'
            guessesEl.appendChild(div);
        } else if (guess < secretNum) {
            let div = document.createElement("div");
            div.innerText = guess;
            div.className = 'guessDiv low'
            guessesEl.appendChild(div);
        }
    }
}

function guessInputListener(e) {
    if (e.key === 'Enter') {
        if (game.prevGuesses.length === 0) {
            guessesEl.innerText = 'Previous Guesses:'
        }
        if (!game.correctGuess) {
            game.userGuess = Number(guessInput.value)
            game.validate(game.userGuess)
        }
    }
}

