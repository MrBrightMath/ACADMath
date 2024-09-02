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

// BEGIN FACTORING JS
var zero1 = 0, zero2 = 0, displayedQuad = '', linearTerm = '', constantTerm = '';

function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
    document.getElementById('factoredForm').style.visibility = 'visible';
}

function nextProb() {
    zero1 = Math.floor(Math.random()*20) - 10;
    zero2 = Math.floor(Math.random()*20) - 10;
    var c = -zero1 * -zero2, b = -zero1 + -zero2, bOp = '', cOp = '', quadToFactor = document.getElementById("problem");
    
    if (b > 0) {
        bOp = '+';
    } else if (b < 0) {
        bOp = '-';
    }
    
    if (c > 0) {
        cOp = '+';
    } else if (c < 0) {
        cOp = '-';
    }
    
    b = Math.abs(b);
    c = Math.abs(c);
    
    if (b == 0) {
        linearTerm = '';
    } else if (b == 1) {
        linearTerm = bOp + 'x';
    } else {
        linearTerm = bOp + b + 'x';
    }
    
    if (c == 0) {
        constantTerm = '';
    } else {
        constantTerm = cOp + c;
    }
    
    displayedQuad = String.raw`\(f(x)=x^2` + linearTerm + constantTerm + String.raw`\)`;
    
    problem.innerHTML = displayedQuad;
    MathJax.typeset();
    
    document.getElementById('factoredForm').value = '';
    
    clearResult();
}

function check() {
    var factorToTest = document.getElementById("factoredForm").value, testZero1, testZero2, firstFactor, secondFactor;
    
    if ((factorToTest.match(/\(/g) || []).length == 1) {
        testZero1 = 0;
        testZero2 = factorToTest.replace(/^\s+|\s+$/gm,'').replace(/\(|\)/g,'').replace(/x/g,'').replace(/ /g,'');
        
    } else if ((factorToTest.match(/\(/g) || []).length == 2) {
        testZero1 = factorToTest.substring(0,factorToTest.lastIndexOf("(")).replace(/^\s+|\s+$/gm,'').replace(/\(|\)/g,'').replace(/x/g,'').replace(/ /g,'');
        testZero2 = factorToTest.substring(factorToTest.lastIndexOf("(") + 1).replace(/^\s+|\s+$/gm,'').replace(/\(|\)/g,'').replace(/x/g,'').replace(/ /g,'');
    }
    
    testZero1 = -parseInt(testZero1);
    testZero2 = -parseInt(testZero2);
    
    if (zero1 < 0) {
        firstFactor = '(x+' + Math.abs(zero1) + ')';
    } else if (zero1 == 0) {
        firstFactor = 'x';
    } else {
        firstFactor = '(x-' + Math.abs(zero1) + ')';
    }
    
    if (zero2 < 0) {
        secondFactor = '(x+' + Math.abs(zero2) + ')';
    } else if (zero2 == 0) {
        secondFactor = firstFactor;
        firstFactor = 'x';
    } else {
        secondFactor = '(x-' + Math.abs(zero2) + ')';
    }
    
    if (testZero1 == zero1 && testZero2 == zero2) {
        displayedQuad = String.raw`\(f(x)=x^2` + linearTerm + constantTerm + '=' + firstFactor + secondFactor + String.raw`\)`;
        isCorrect(true);
    } else if (testZero1 == zero2 && testZero2 == zero1) {
        displayedQuad = String.raw`\(f(x)=x^2` + linearTerm + constantTerm + '=' + firstFactor + secondFactor + String.raw`\)`;
        isCorrect(true);
    } else {
        isCorrect(false);
    }
    
    document.getElementById('problem').innerHTML = displayedQuad;
    MathJax.typeset();

    updateScore();
}