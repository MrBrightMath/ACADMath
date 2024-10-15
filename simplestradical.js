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

// Scoreboard2 JS
var numberCorrect2 = 0, numberGuesses2 = 0, hasIncreased2 = 0;

function resetScoreboard2() {
    numberCorrect2 = 0;
    hasIncreased2 = 0;
    numberGuesses2 = 0;
    document.getElementById('correct2').innerHTML = '0';
    document.getElementById('guesses2').innerHTML = '0';
    document.getElementById('percent2').innerHTML = '0';
}

function updateScore2() {
    document.getElementById('correct2').innerHTML = numberCorrect2;
    document.getElementById('guesses2').innerHTML = numberGuesses2;
    document.getElementById('percent2').innerHTML = Math.floor(numberCorrect2/numberGuesses2 * 100) + '%';
}

// RESULT
var whichIncorrect2 = 0, incorrectResponses2 = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

function isCorrect2(correct) {
    if (hasIncreased2 == 0) {
        numberGuesses2++;
    }
    if (correct) {
        numberCorrect2++;
        hasIncreased2 = 1;
        document.getElementById('result2').innerHTML = '<h2 style="color: green">Correct!</h2>';
        document.getElementById('check2').style.visibility = 'hidden';
        document.getElementById('nextProb2').style.visibility = 'visible';
    } else {
        document.getElementById('result2').innerHTML = '<h2 style="color: darkred">' + incorrectResponses2[whichIncorrect2] + '</h2>';
        whichIncorrect2++;
        if (whichIncorrect2 == incorrectResponses2.length) {
            whichIncorrect2 = 0;
        }
    }
    document.getElementById('result2').style.visibility = 'visible';
    
    if (numberCorrect2 == 10) {
        throwConfetti2();
    }
}

function clearResult2() {
    document.getElementById('result2').innerHTML = '<h2 style="color: green">--</h2>';
    document.getElementById('result2').style.visibility = 'hidden';
    hasIncreased2 = 0;
    document.getElementById('check2').style.visibility = 'visible';
    document.getElementById('nextProb2').style.visibility = 'hidden';
    document.getElementById('startFresh2').innerHTML = 'Start Fresh';
}

function throwConfetti2() {
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
    
    const cleanUp = setTimeout(cleanUpConfetti2, 2000, fullscreenDiv);
}

function cleanUpConfetti2(thing) {
    document.body.removeChild(thing);
}

// SIMPLEST RADICAL FORM
let irrArray2 = [1,1,2,2,2,2,3,3,3,3,5,5,5,5,6,6,6,7,7,7,10,10,11];

var ratSolution2 = 0, irrSolution2 = 0, xpower = 0, ypower = 0, zpower = 0, radToDisplay2 = '';

function startFresh2() {
    resetScoreboard2();
    clearResult2();
    nextProb2();
    document.getElementById('rational2').style.visibility = 'visible';
    document.getElementById('irrational2').style.visibility = 'visible';
}

function nextProb2() {
    ratInt = Math.floor(Math.random()*10) + 1;
    ratSolution2 = ratInt;
    irrInt = irrArray2[Math.floor(Math.random()*irrArray.length)];
    irrSolution2 = irrInt;
    xRatPower = Math.floor(Math.random()*10);
    xIrrPower = Math.floor(Math.random()*2);
    yRatPower = Math.floor(Math.random()*10);
    yIrrPower = Math.floor(Math.random()*2);
    zRatPower = Math.floor(Math.random()*10);
    zIrrPower = Math.floor(Math.random()*2);
    
    if (xRatPower > 0) {
        if (xRatPower == 1) {
            ratSolution2 = ratSolution2 + 'x';
        } else {
            ratSolution2 = ratSolution2 + String.raw`x^` + xRatPower;
        }
    }
    if (yRatPower > 0) {
        if (yRatPower == 1) {
            ratSolution2 = ratSolution2 + 'y';
        } else {
            ratSolution2 = ratSolution2 + String.raw`y^` + yRatPower;
        }
    }
    if (zRatPower > 0) {
        if (zRatPower == 1) {
            ratSolution2 = ratSolution2 + 'z';
        } else {
            ratSolution2 = ratSolution2 + String.raw`z^` + zRatPower;
        }
    }
    if (xIrrPower > 0) {
        irrSolution2 = irrSolution2 + 'x';
    }
    if (yIrrPower > 0) {
        irrSolution2 = irrSolution2 + 'y';
    }
    if (zIrrPower > 0) {
        irrSolution2 = irrSolution2 + 'z';
    }

    var newInt = ratInt * ratInt * irrInt;
    var newX = '', newY = '', newZ = '';
    if (2*xRatPower + xIrrPower > 0) {
        newX = 'x^{' + (2*xRatPower + xIrrPower) + '}';
    }
    if (2*yRatPower + yIrrPower > 0) {
        newY = 'y^{' + (2*yRatPower + yIrrPower) + '}';
    }
    if (2*zRatPower + zIrrPower > 0) {
        newZ = 'z^{' + (2*zRatPower + zIrrPower) + '}';
    }
    radToDisplay2 = String.raw`\(\sqrt{` + newInt + newX + newY + newZ + String.raw`}\)`;
    
    document.getElementById('problem2').innerHTML = radToDisplay2;
    MathJax.typeset();
    
    document.getElementById('rational2').value = '';
    document.getElementById('irrational2').value = '';
    
    clearResult2();
    // alert('Rational: ' + ratSolution2 + ', Irrational: ' + irrSolution2);
}

function check2() {
    var guessedRat2;
    if (document.getElementById('rational2').value == '') {
        guessedRat2 = 1;
    } else {
        guessedRat2 = document.getElementById('rational2').value;
    }
    
    var guessedIrr2;
    if (document.getElementById('irrational2').value == '') {
        guessedIrr2 = 1;
    } else {
        guessedIrr2 = document.getElementById('irrational2').value
    }
    alert('Rational: ' + ratSolution2 + ', Guessed: ' + guessedRat2 + ', Irrational: ' + irrSolution2 + ', Guessed: ' + guessedIrr2);
    if (guessedRat2 == ratSolution2 && guessedIrr2 == irrSolution2) {
        var newRad2 = ratSolution2 * ratSolution2 * irrSolution2;
        if (irrSolution2 == 1) {
            radToDisplay2 = radToDisplay2.substr(0, radToDisplay2.length - 2) + String.raw` = ` + ratSolution2 + String.raw`\)`;
        } else {
            if (ratSolution2 == 1) {
                radToDisplay2 = radToDisplay2.substr(0, radToDisplay2.length - 2) + String.raw` = \sqrt{` + irrSolution2 + String.raw`}\)`;
            } else {
                radToDisplay2 = radToDisplay2.substr(0, radToDisplay2.length - 2) + String.raw` = ` + ratSolution2 + String.raw`\sqrt{` + irrSolution2 + String.raw`}\)`;
            }
        }
    
        document.getElementById('problem2').innerHTML = radToDisplay2;
        MathJax.typeset();
        isCorrect2(true);
    } else {
        isCorrect2(false);
    }
    
    updateScore2();
}