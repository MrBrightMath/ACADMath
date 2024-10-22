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
}

function nextProb() {
    var oddB = document.getElementById("oddB").checked;
    
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
        hText = '(x+' + Math.abs(h) + ')^2';
    } else {
        hText = '(x-' + Math.abs(h) + ')^2';
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
        document.getElementById('result2').innerHTML = '<h2 style="color: darkred">' + incorrectResponses[whichIncorrect] + '</h2>';
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

// BEGIN COMPLETE SQUARE WITH A JS
var aa = 0, ah = 0, ak = 0, stretchValue = 1, linearTerm2 = '', constantTerm2 = '', displayedQuad2;

function startFresh2() {
    resetScoreboard2();
    clearResult2();
    nextProb2();
}

function nextProb2() {
    var oddB2 = document.getElementById("oddB2").checked;
    
    if (oddB2) {
        ah = (Math.floor(Math.random()*40) - 20)/2;
    } else {
        ah = Math.floor(Math.random()*40) - 20;
    }
    
    ak = Math.floor(Math.random()*20) - 10;
    aa = Math.floor(Math.random()*9) + 2;
    if (Math.random() < 0.5) {
        aa = -aa;
    }
    if (aa == 1) {
        stretchValue = "";
    } else if (aa == -1) {
        stretchValue = "-";
    } else {
        stretchValue = aa;
    }
    
    var c2 = aa*(-ah)*(-ah) + ak, b2 = aa*2*-ah, bOp2 = '', cOp2 = '', problem2 = document.getElementById("problem2");
    
    if (b2 > 0) {
        bOp2 = '+';
    } else if (b2 < 0) {
        bOp2 = '-';
    }
    
    if (c2 > 0) {
        cOp2 = '+';
    } else if (c2 < 0) {
        cOp2 = '-';
    }
    
    b2 = Math.abs(b2);
    c2 = Math.abs(c2);
    
    if (b2 == 0) {
        linearTerm2 = '';
    } else if (b2 == 1) {
        linearTerm2 = bOp2 + 'x';
    } else {
        linearTerm2 = bOp2 + b2 + 'x';
    }
    
    if (c2 == 0) {
        constantTerm2 = '';
    } else {
        constantTerm2 = cOp2 + c2;
    }
    
    displayedQuad2 = String.raw`\(f(x)=` + stretchValue + "x^2" + linearTerm2 + constantTerm2 + String.raw`\)`;
    
    problem2.innerHTML = displayedQuad2;
    MathJax.typeset();
    
    document.getElementById('aValue2').value = '';
    document.getElementById('hValue2').value = '';
    document.getElementById('kValue2').value = '';
    
    clearResult2();
}

function check2() {
    var testA2 = parseFloat(document.getElementById('aValue2').value),testH2 = -1*parseFloat(document.getElementById("hValue2").value), testK2 = parseFloat(document.getElementById("kValue2").value), aText2 = '', hText2 = '', kText2 = '', problem2 = document.getElementById("problem2");
    if (ah == 0) {
        hText2 = 'x^2';
    } else if (ah < 0) {
        hText2 = '(x+' + Math.abs(ah) + ')^2';
    } else {
        hText2 = '(x-' + Math.abs(ah) + ')^2';
    }
    
    if (ak == 0) {
        kText2 = '';
    } else if (ak < 0) {
        kText2 = '-' + Math.abs(ak);
    } else {
        kText2 = '+' + Math.abs(ak);
    }
    
    if (testA2 == aa && testH2 == ah && testK2 == ak) {
        displayedQuad2 = String.raw`\(f(x)=` + stretchValue + "x^2" + linearTerm2 + constantTerm2 + `=` + stretchValue + hText2 + kText2 + String.raw`\)`;
        isCorrect2(true);
    } else {
        isCorrect2(false);
    }

    problem2.innerHTML = displayedQuad2;
    MathJax.typeset();

    updateScore();
}