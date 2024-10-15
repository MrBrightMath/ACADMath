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

// BEGIN QUAD VERTEX JS
var a = 0, b = 0, c = 0, discrim = 0, numZeros = 0, displayedQuad = '';

function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
    document.getElementById('discrim').style.visibility = 'visible';
    document.getElementById('numZeros').style.visibility = 'visible';
}

function nextProb() {
    a = Math.floor(Math.random()*9) - 4;
    if (a == 0) {
        while (a == 0) {
            a = Math.floor(Math.random()*9) - 4;
        }
    }

    b = Math.floor(Math.random()*21) - 10;
    c = Math.floor(Math.random()*21) - 10;
    
    discrim = (b * b) - (4 * a * c);
    if (discrim > 0) {
        numZeros = 2;
    } else if (discrim == 0) {
        numZeros = 1;
    } else {
        numZeros = 0;
    }
    
    if (a == 1) {
        displayedQuad = String.raw`\(f(x)=x^2`;
    } else if (a == -1) {
        displayedQuad = String.raw`\(f(x)=-x^2`;
    } else {
        displayedQuad = String.raw`\(f(x)=` + a + String.raw`x^2`;
    }
    
    if (b > 0) {
        if (b == 1) {
            displayedQuad = displayedQuad + '+x';
        } else {
            displayedQuad = displayedQuad + '+' + b + 'x';
        }        
    } else if (b < 0) {
        if (b == -1) {
            displayedQuad = displayedQuad + '-x';
        } else {
            displayedQuad = displayedQuad + '-' + -b + 'x';
        }
        
    }
    
    if (c > 0) {
        displayedQuad = displayedQuad + '+' + c;
    } else if (c < 0) {
        displayedQuad = displayedQuad + '-' + -c;
    }
    displayedQuad = displayedQuad + String.raw`\)`;
    
    document.getElementById('problem').innerHTML = displayedQuad;
    MathJax.typeset();
    
    document.getElementById('discrim').value = '';
    document.getElementById('numZeros').value = '';
    
    clearResult();
}

function check() {
    var discrimToTest = document.getElementById('discrim').value, zerosToTest = document.getElementById('numZeros').value;
    
    if (discrimToTest == discrim && zerosToTest == numZeros) {
        isCorrect(true);
    } else {
        isCorrect(false);
    }

    updateScore();
}