// BEGIN FACTORING JS
var h = 0, k = 0, numberCorrect = 0, numberGuesses = 0; hasIncreased = 0, whichIncorrect = 0, incorrectResponses = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

function startFresh() {
    numberCorrect = 0;
    hasIncreased = 0;
    numberGuesses = 0;
    document.getElementById("numberCorrect").innerHTML = "<p>Correct: 0</p>";
    document.getElementById("numberGuesses").innerHTML = "<p>Guesses: 0</p>";
    document.getElementById("percentCorrect").innerHTML = "<p>Percent: 0</p>";
    getQuad();
}

function getQuad() {
    oddB = document.getElementById("oddB").checked;
    
    if (oddB) {
        h = (Math.floor(Math.random()*40) - 20)/2;
    } else {
        h = Math.floor(Math.random()*40) - 20;
    }
    
    k = Math.floor(Math.random()*20) - 10;
    
    var c = (-h)*(-h) + k, b = 2*-h, bOp = '', cOp = '', quadToFactor = document.getElementById("quadToFactor"), linearTerm = '', constantTerm = '';
    
    if (b > 0) {
        bOp = '+';
    } else if (b < 0) {
        bOp = '–';
    }
    
    if (c > 0) {
        cOp = '+';
    } else if (c < 0) {
        cOp = '–';
    }
    
    b = Math.abs(b);
    c = Math.abs(c);
    
    if (b == 0) {
        linearTerm = '';
    } else if (b == 1) {
        linearTerm = bOp + ' <i>x</i> ';
    } else {
        linearTerm = bOp + ' ' + b + '<i>x</i> ';
    }
    
    if (c == 0) {
        constantTerm = '';
    } else {
        constantTerm = cOp + ' ' + c;
    }
    
    let newQuad = '<h2 class="math"><i>f </i>(<i>x</i>) = <i>x</i><sup>2</sup> ' + linearTerm + constantTerm + '</h2>';
    
    quadToFactor.innerHTML = newQuad;
    
    document.getElementById("result").innerHTML = '';
    document.getElementById("hValue").value = '';
    document.getElementById("kValue").value = '';
    
    hasIncreased = 0;
    
    document.getElementById("testFactoring").style.visibility = "visible";
    document.getElementById("nextQuad").style.visibility = "hidden";
    document.getElementById("startFresh").innerHTML = "Start Fresh";
}

function testFactoring() {
    var testH = -1*parseFloat(document.getElementById("hValue").value), testK = parseFloat(document.getElementById("kValue").value), answer = incorrectResponses[whichIncorrect];
    
    var correctText = document.getElementById("numberCorrect"), guessesText = document.getElementById("numberGuesses"), percentText = document.getElementById("percentCorrect"), checkButton = document.getElementById("testFactoring"), getQuadButton = document.getElementById("nextQuad");
    
    if (hasIncreased == 0) {
        numberGuesses++;
        whichIncorrect++;
        if (whichIncorrect > 2) {
            whichIncorrect = 0;
        }
    }
    
    if (testH == h && testK == k) {
        answer = 'Correct!';
        if (hasIncreased == 0) {
            numberCorrect++;
            correctText.innerHTML = '<p>Correct: ' + numberCorrect + '</p>';
            hasIncreased = 1;
            checkButton.style.visibility = "hidden";
            getQuadButton.style.visibility = "visible";
        }        
    }
    
    guessesText.innerHTML = '<p>Guesses: ' + numberGuesses + '</p>';
    percentText.innerHTML = '<p>Percent: ' + Math.floor(numberCorrect/numberGuesses * 100) + '%</p>';
    
    var resultText = document.getElementById("result");
    
    resultText.innerHTML = '<h1>' + answer;
}