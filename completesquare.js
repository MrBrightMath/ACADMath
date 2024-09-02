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
var h = 0, k = 0, linearTerm = '', constantTerm = '', displayedQuad;

function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
    document.getElementById('rational').style.visibility = 'visible';
    document.getElementById('irrational').style.visibility = 'visible';
}

function nextProb() {
    oddB = document.getElementById("oddB").checked;
    
    if (oddB) {
        h = (Math.floor(Math.random()*40) - 20)/2;
    } else {
        h = Math.floor(Math.random()*40) - 20;
    }
    
    k = Math.floor(Math.random()*20) - 10;
    
    var c = (-h)*(-h) + k, b = 2*-h, bOp = '', cOp = '', problem = document.getElementById("problem");
    
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
    
    document.getElementById('hValue').value = '';
    document.getElementById('kValue').value = '';
    
    clearResult();
}

function check() {
    var testH = -1*parseFloat(document.getElementById("hValue").value), testK = parseFloat(document.getElementById("kValue").value), hText = '', kText = '', problem = document.getElementById("problem");
    if (h == 0) {
        hText = 'x^2';
    } else if (h < 0) {
        hText = '(x-' + Math.abs(h) + ')^2';
    } else {
        hText = '(x+' + Math.abs(h) + ')^2';
    }
    
    if (k == 0) {
        kText = '';
    } else if (k < 0) {
        kText = '-' + Math.abs(k);
    } else {
        kText = '+' + Math.abs(k);
    }
    
    if (testH == h && testK == k) {
        displayedQuad = String.raw`\(f(x)=x^2` + linearTerm + constantTerm + `=` + hText + kText + String.raw`\)`;
        isCorrect(true);
    } else {
        isCorrect(false);
    }

    problem.innerHTML = displayedQuad;
    MathJax.typeset();

    updateScore();
}