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
var a = 0, h = 0, k = 0, displayedQuad = '';

function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
    document.getElementById('quadVertex').style.visibility = 'visible';
}

function nextProb() {
    a = Math.floor(Math.random()*9) - 4;
    if (a == 0) {
        while (a == 0) {
            a = Math.floor(Math.random()*9) - 4;
        }
    }
    h = Math.floor(Math.random()*21) - 10;
    k = Math.floor(Math.random()*21) - 10;

    if (h == 0) {
        displayedQuad = String.raw`\(f(x)=` + a + String.raw`x^2`;
    } else if (h > 0) {
        displayedQuad = String.raw`\(f(x)=` + a + String.raw`(x-` + h + String.raw`)^2`;
    } else {
        displayedQuad = String.raw`\(f(x)=` + a + String.raw`(x+` + -1*h + String.raw`)^2`;
    }
    
    if (k > 0) {
        displayedQuad = displayedQuad + String.raw`+` + k + String.raw`\)`;
    } else if (k < 0) {
        displayedQuad = displayedQuad + k + String.raw`\)`;
    } else {
        displayedQuad = displayedQuad + String.raw`\)`;
    }
    
    document.getElementById('problem').innerHTML = displayedQuad;
    MathJax.typeset();
    
    document.getElementById('quadVertex').value = '';
    
    clearResult();
}

function check() {
    var vertexToTest = document.getElementById('quadVertex').value, testVertex = '', trueVertex = h + ',' + k;
    
    testVertex = vertexToTest.replace(/^\s+|\s+$/gm,'').replace(/\(|\)/g,'').replace(/x/g,'').replace(/ /g,'');

    if (testVertex == trueVertex) {
        isCorrect(true);
    } else {
        isCorrect(false);
    }

    updateScore();
}

// BEGIN ABS VERTEX JS

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

var aa = 0, ah = 0, ak = 0, displayedQuad2 = '';

function startFresh2() {
    resetScoreboard2();
    clearResult2();
    nextProb2();
    document.getElementById('absVertex').style.visibility = 'visible';
}

function nextProb2() {
    aa = Math.floor(Math.random()*9) - 4;
    if (aa == 0) {
        while (aa == 0) {
            aa = Math.floor(Math.random()*9) - 4;
        }
    }
    ah = Math.floor(Math.random()*21) - 10;
    ak = Math.floor(Math.random()*21) - 10;

    if (ah == 0) {
        displayedQuad2 = String.raw`\(f(x)=` + aa + String.raw`|x|`;
    } else if (ah > 0) {
        displayedQuad2 = String.raw`\(f(x)=` + aa + String.raw`|x-` + ah + String.raw`|`;
    } else {
        displayedQuad2 = String.raw`\(f(x)=` + aa + String.raw`|x+` + -1*ah + String.raw`|`;
    }
    
    if (ak > 0) {
        displayedQuad2 = displayedQuad2 + String.raw`+` + ak + String.raw`\)`;
    } else if (ak < 0) {
        displayedQuad2 = displayedQuad2 + ak + String.raw`\)`;
    } else {
        displayedQuad2 = displayedQuad2 + String.raw`\)`;
    }
    
    document.getElementById('problem2').innerHTML = displayedQuad2;
    MathJax.typeset();
    
    document.getElementById('absVertex').value = '';
    
    clearResult2();
}

// define the _removeSpaces(value) function
function _removeSpaces(v){
	// remove all spaces
	while( v.indexOf(" ") > -1 ) v = v.substring( 0, v.indexOf(" ") ) + v.substring( v.indexOf(" ")+1 );
	return v;
}

function check2() {
    var vertexToTest2 = document.getElementById('absVertex').value, testVertex2 = '', trueVertex2 = ah + ',' + ak;
    
    testVertex2 = vertexToTest2.replace(/^\s+|\s+$/gm,'').replace(/\(|\)/g,'').replace(/x/g,'').replace(/ /g,'');

    if (testVertex2 == trueVertex2) {
        isCorrect2(true);
    } else {
        isCorrect2(false);
    }

    updateScore2();
}