// Need this for rounding
// Math.round((num + Number.EPSILON) * 100) / 100

// Scoreboard JS
var numberCorrect = 0, numberGuesses = 0, hasIncreased = 0;

function resetScoreboard() {
    numberCorrect = 0;
    hasIncreased = 0;
    numberGuesses = 0;
    document.getElementById('correct').innerHTML = '0';
    document.getElementById('guesses').innerHTML = '0';
    document.getElementById('percent').innerHTML = '0';
}

function updateScore() {
    document.getElementById('correct').innerHTML = numberCorrect;
    document.getElementById('guesses').innerHTML = numberGuesses;
    document.getElementById('percent').innerHTML = Math.floor(numberCorrect/numberGuesses * 100) + '%';
}

// RESULT
var whichIncorrect = 0, incorrectResponses = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

function isCorrect(correct) {
    if (hasIncreased == 0) {
        numberGuesses++;
    }
    if (correct) {
        numberCorrect++;
        hasIncreased = 1;
        document.getElementById('result').innerHTML = '<h2 style="color: green">Correct!</h2>';
        document.getElementById('check').style.visibility = 'hidden';
        document.getElementById('nextProb').style.visibility = 'visible';
    } else {
        document.getElementById('result').innerHTML = '<h2 style="color: darkred">' + incorrectResponses[whichIncorrect] + '</h2>';
        whichIncorrect++;
        if (whichIncorrect == incorrectResponses.length) {
            whichIncorrect = 0;
        }
    }
    document.getElementById('result').style.visibility = 'visible';
    
    if (numberCorrect == 10) {
        throwConfetti();
    }
}

function clearResult() {
    document.getElementById('result').innerHTML = '<h2 style="color: green">--</h2>';
    document.getElementById('result').style.visibility = 'hidden';
    hasIncreased = 0;
    document.getElementById('check').style.visibility = 'visible';
    document.getElementById('nextProb').style.visibility = 'hidden';
    document.getElementById('startFresh').innerHTML = 'Start Fresh';
}

function throwConfetti() {
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.style.position = 'fixed';
    fullscreenDiv.style.top = 0;
    fullscreenDiv.style.left = 0;
    fullscreenDiv.style.width = '100%';
    fullscreenDiv.style.height = '100%';
    fullscreenDiv.style.backgroundColor = 'transparent';
    fullscreenDiv.style.zIndex = 9999;
    
    const gifImage = document.createElement('img');
    gifImage.src = 'Images/confetti.gif';
    gifImage.style.width = '100%';
    gifImage.style.height = '100%';
    gifImage.style.objectFit = 'contain';
    
    fullscreenDiv.appendChild(gifImage);
    
    document.body.appendChild(fullscreenDiv);
    
    const cleanUp = setTimeout(cleanUpConfetti, 2000, fullscreenDiv);
}

function cleanUpConfetti(thing) {
    document.body.removeChild(thing);
}

// ROUNDING JS
var randNum, placeValue, correctAnswer;

function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
    document.getElementById('rounded').style.visibility = 'visible';
}

function nextProb() {
    if (document.getElementById('decimals').checked == true) {
        randNum = (Math.floor(Math.random()*100000) + 1) / 10000;
        placeValue = Math.pow(10, Math.floor(Math.random() * 4));
        correctAnswer = Math.round(randNum * placeValue) / placeValue;
        placeValue = 1 / placeValue;
    } else {
        randNum = Math.floor(Math.random()*1000) + 1;
        placeValue = Math.pow(10, Math.floor(Math.random() * 3));
        correctAnswer = Math.round(randNum / placeValue) * placeValue;
    }
    
    document.getElementById('problem').innerHTML = randNum + " rounded to the nearest " + placeValue;
    document.getElementById('rounded').value = '';
    
    clearResult();
}

function check() {
    if (document.getElementById('rounded').value == correctAnswer) {
        document.getElementById('problem').innerHTML = randNum + " ≈ " + correctAnswer;
        isCorrect(true);
    } else {
        isCorrect(false);
    }
    
    updateScore();
}