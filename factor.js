// BEGIN FACTORING JS
var zero1 = 0, zero2 = 0, numberCorrect = 0, numberGuesses = 0; hasIncreased = 0, whichIncorrect = 0, incorrectResponses = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

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
    zero1 = Math.floor(Math.random()*20) - 10;
    zero2 = Math.floor(Math.random()*20) - 10;
    var c = -zero1 * -zero2, b = -zero1 + -zero2, bOp = '', cOp = '', quadToFactor = document.getElementById("quadToFactor"), linearTerm = '', constantTerm = '';
    
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
    
    var resultText = document.getElementById("result");
    
    resultText.innerHTML = '';
    
    var clearInput = document.getElementById("factoredForm");
    clearInput.value = '';
    
    hasIncreased = 0;
    
    document.getElementById("testFactoring").style.visibility = "visible";
    document.getElementById("nextQuad").style.visibility = "hidden";
    document.getElementById("startFresh").innerHTML = "Start Fresh";
}

function testFactoring() {
    var factorToTest = document.getElementById("factoredForm").value, testZero1, testZero2, answer = incorrectResponses[whichIncorrect];
    
    if ((factorToTest.match(/\(/g) || []).length == 1) {
        testZero1 = 0;
        testZero2 = factorToTest.replace(/^\s+|\s+$/gm,'').replace(/\(|\)/g,'').replace(/x/g,'').replace(/ /g,'');
        
    } else if ((factorToTest.match(/\(/g) || []).length == 2) {
        testZero1 = factorToTest.substring(0,factorToTest.lastIndexOf("(")).replace(/^\s+|\s+$/gm,'').replace(/\(|\)/g,'').replace(/x/g,'').replace(/ /g,'');
        testZero2 = factorToTest.substring(factorToTest.lastIndexOf("(") + 1).replace(/^\s+|\s+$/gm,'').replace(/\(|\)/g,'').replace(/x/g,'').replace(/ /g,'');
    }
    
    testZero1 = -parseInt(testZero1);
    testZero2 = -parseInt(testZero2);
    var correctText = document.getElementById("numberCorrect"), guessesText = document.getElementById("numberGuesses"), percentText = document.getElementById("percentCorrect"), checkButton = document.getElementById("testFactoring"), getQuadButton = document.getElementById("nextQuad");
    
    if (hasIncreased == 0) {
        numberGuesses++;
        whichIncorrect++;
        if (whichIncorrect > 2) {
            whichIncorrect = 0;
        }
    }
    
    if (testZero1 == zero1 && testZero2 == zero2) {
        answer = 'Correct!';
        if (hasIncreased == 0) {
            numberCorrect++;
            correctText.innerHTML = '<p>Correct: ' + numberCorrect + '</p>';
            hasIncreased = 1;
            checkButton.style.visibility = "hidden";
            getQuadButton.style.visibility = "visible";
        }        
    }
    
    if (testZero1 == zero2 && testZero2 == zero1) {
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