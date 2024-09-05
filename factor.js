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
    zero1 = Math.floor(Math.random()*21) - 10;
    zero2 = Math.floor(Math.random()*21) - 10;
    if (zero1 == 0 && zero2 == 0) {
        while (zero2 == 0) {
            zero2 = Math.floor(Math.random()*21) - 10;
        }
    }
    var c = -zero1 * -zero2, b = -zero1 + -zero2, bOp = '', cOp = '';
    
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
    
    document.getElementById('problem').innerHTML = displayedQuad;
    MathJax.typeset();
    
    document.getElementById('factoredForm').value = '';
    
    clearResult();
}

function check() {
    var factorToTest = document.getElementById('factoredForm').value, testZero1, testZero2, firstFactor, secondFactor;
    
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

// BEGIN FACTORING JS WITH A NEQ 1

// Scoreboard JS
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
        document.getElementById('result2').innerHTML = '<h2 style="color: darkred">' + incorrectResponses2[whichIncorrect] + '</h2>';
        whichIncorrect2++;
        if (whichIncorrect2 == incorrectResponses2.length) {
            whichIncorrect2 = 0;
        }
    }
    document.getElementById('result2').style.visibility = 'visible';
    
    if (numberCorrect2 == 10) {
        throwConfetti();
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

var coeffArray = [1, 1, 1, 1, 1, 1, 1, 2, 2, 3], m1 = 0, b1 = 0, m2 = 0, b2 = 0, displayedQuad2 = '', linearTerm2 = '', constantTerm2 = '';

function startFresh2() {
    resetScoreboard2();
    clearResult2();
    nextProb2();
    document.getElementById('factoredForm2').style.visibility = 'visible';
}

function nextProb2() {
    m1 = Math.floor(Math.random()*2) + 2;
    b1 = Math.floor(Math.random()*21) - 10;
    if (b1 != 0) {
        while (b1 % m1 == 0) {
            b1 = Math.floor(Math.random()*21) - 10;
        }
    }
    m2 = coeffArray[Math.floor(Math.random()*coeffArray.length)];
    b2 = Math.floor(Math.random()*21) - 10;
    if (b1 == 0 && b2 == 0) {
        while (b2 == 0) {
            b2 = Math.floor(Math.random()*21) - 10;
        }
    }
    if (b2 != 0 && m2 > 1) {
        while (b2 % m2 == 0) {
            b2 = Math.floor(Math.random()*21) - 10;
        }
    }
    
    var c = b1 * b2, b = m1 * b2 + m2 * b1, a = m1 * m2, bOp = '', cOp = '';
    
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
        linearTerm2 = '';
    } else if (b == 1) {
        linearTerm2 = bOp + 'x';
    } else {
        linearTerm2 = bOp + b + 'x';
    }
    
    if (c == 0) {
        constantTerm2 = '';
    } else {
        constantTerm2 = cOp + c;
    }
    
    displayedQuad2 = String.raw`\(f(x)=` + a + String.raw`x^2` + linearTerm2 + constantTerm2 + String.raw`\)`;
    
    document.getElementById('problem2').innerHTML = displayedQuad2;
    MathJax.typeset();
    
    document.getElementById('factoredForm2').value = '';
    
    clearResult2();
}

// define the _removeSpaces(value) function
function _removeSpaces(v){
	// remove all spaces
	while( v.indexOf(" ") > -1 ) v = v.substring( 0, v.indexOf(" ") ) + v.substring( v.indexOf(" ")+1 );
	return v;
}

function check2() {
    var m1Coeff, m2Coeff, factorToTest = document.getElementById('factoredForm2').value, firstFactor, secondFactor, possibleSolutions = [];
    factorToTest = _removeSpaces(factorToTest);
    
    if (m1 == 1) {
        m1Coeff = '';
    } else {
        m1Coeff = m1;
    }
    
    if (m2 == 1) {
        m2Coeff = '';
    } else {
        m2Coeff = m2;
    }
    
    if (b1 == 0) {
        firstFactor = m1Coeff + "x";
    } else if (b1 > 0) {
        firstFactor = "(" + m1Coeff + "x+" + b1 + ")";
    } else {
        firstFactor = "(" + m1Coeff + "x-" + Math.abs(b1) + ")";
    }
    
    if (b2 == 0) {
        secondFactor = m2Coeff + "x";
    } else if (b2 > 0) {
        secondFactor = "(" + m2Coeff + "x+" + b2 + ")";
    } else {
        secondFactor = "(" + m2Coeff + "x-" + Math.abs(b2) + ")";
    }
    
    possibleSolutions.push(firstFactor + secondFactor);
    possibleSolutions.push(secondFactor + firstFactor);
    
    if (possibleSolutions.includes(factorToTest)) {
        var a = m1 * m2;
        displayedQuad2 = String.raw`\(f(x)=` + a + String.raw`x^2` + linearTerm2 + constantTerm2 + "=" + factorToTest + String.raw`\)`;
        isCorrect2(true);
    } else {
        isCorrect2(false);
    }
    
    document.getElementById('problem2').innerHTML = displayedQuad2;
    MathJax.typeset();

    updateScore2();
}