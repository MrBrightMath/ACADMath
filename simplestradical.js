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

// SIMPLEST RADICAL FORM
let irrArray = [1,1,2,2,2,2,3,3,3,3,5,5,5,5,6,6,6,7,7,7,10,10,11];

var ratSolution = 0, irrSolution = 0;

function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
    document.getElementById('rational').style.visibility = 'visible';
    document.getElementById('irrational').style.visibility = 'visible';
}

function nextProb() {
    ratSolution = Math.floor(Math.random()*10) + 1;
    irrSolution = irrArray[Math.floor(Math.random()*irrArray.length)];
    var newRad = ratSolution * ratSolution * irrSolution;
    radToDisplay = String.raw`\(\sqrt{` + newRad + String.raw`}\)`;
    
    document.getElementById('problem').innerHTML = radToDisplay;
    MathJax.typeset();
    
    document.getElementById('rational').value = '';
    document.getElementById('irrational').value = '';
    
    clearResult();
}

function check() {
    var guessedRat;
    if (document.getElementById('rational').value == '') {
        guessedRat = 1;
    } else {
        guessedRat = parseInt(document.getElementById('rational').value);
    }
    
    var guessedIrr;
    if (document.getElementById('irrational').value == '') {
        guessedIrr = 1;
    } else {
        guessedIrr = parseInt(document.getElementById('irrational').value);
    }
    
    if (guessedRat == ratSolution && guessedIrr == irrSolution) {
        var newRad = ratSolution * ratSolution * irrSolution;
        if (irrSolution == 1) {
            radToDisplay = String.raw`\(\sqrt{` + newRad + String.raw`} = ` + ratSolution + String.raw`\)`;
        } else {
            if (ratSolution == 1) {
                radToDisplay = String.raw`\(\sqrt{` + newRad + String.raw`} = \sqrt{` + irrSolution + String.raw`}\)`;
            } else {
                radToDisplay = String.raw`\(\sqrt{` + newRad + String.raw`} = ` + ratSolution + String.raw`\sqrt{` + irrSolution + String.raw`}\)`;
            }
        }
    
        document.getElementById('problem').innerHTML = radToDisplay;
        MathJax.typeset();
        isCorrect(true);
    } else {
        isCorrect(false);
    }
    
    updateScore();
}