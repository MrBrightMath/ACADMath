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

// BEGIN STANDARD FORM
// Scoreboard JS
var numberCorrect3 = 0, numberGuesses3 = 0, hasIncreased3 = 0;

function resetScoreboard3() {
    numberCorrect3 = 0;
    hasIncreased3 = 0;
    numberGuesses3 = 0;
    document.getElementById('correct3').innerHTML = '0';
    document.getElementById('guesses3').innerHTML = '0';
    document.getElementById('percent3').innerHTML = '0';
}

function updateScore3() {
    document.getElementById('correct3').innerHTML = numberCorrect3;
    document.getElementById('guesses3').innerHTML = numberGuesses3;
    document.getElementById('percent3').innerHTML = Math.floor(numberCorrect3/numberGuesses3 * 100) + '%';
}

// RESULT
var whichIncorrect3 = 0, incorrectResponses3 = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

function isCorrect3(correct) {
    if (hasIncreased3 == 0) {
        numberGuesses3++;
    }
    if (correct) {
        numberCorrect3++;
        hasIncreased3 = 1;
        document.getElementById('result3').innerHTML = '<h2 style="color: green">Correct!</h2>';
        document.getElementById('check3').style.visibility = 'hidden';
        document.getElementById('nextProb3').style.visibility = 'visible';
    } else {
        document.getElementById('result3').innerHTML = '<h2 style="color: darkred">' + incorrectResponses3[whichIncorrect3] + '</h2>';
        whichIncorrect3++;
        if (whichIncorrect3 == incorrectResponses3.length) {
            whichIncorrect3 = 0;
        }
    }
    document.getElementById('result3').style.visibility = 'visible';
    
    if (numberCorrect3 == 10) {
        throwConfetti3();
    }
}

function clearResult3() {
    document.getElementById('result3').innerHTML = '<h2 style="color: green">--</h2>';
    document.getElementById('result3').style.visibility = 'hidden';
    hasIncreased3 = 0;
    document.getElementById('check3').style.visibility = 'visible';
    document.getElementById('nextProb3').style.visibility = 'hidden';
    document.getElementById('startFresh3').innerHTML = 'Start Fresh';
}

function throwConfetti3() {
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
    
    const cleanUp = setTimeout(cleanUpConfetti3, 2000, fullscreenDiv);
}

function cleanUpConfetti3(thing) {
    document.body.removeChild(thing);
}

// BEGIN QUAD STANDARD VERTEX JS
var a3 = 0, b3 = 0, c3 = 0, h3 = '', k3 = 0, displayedQuad3 = '';

function startFresh3() {
    resetScoreboard3();
    clearResult3();
    nextProb3();
    document.getElementById('quadVertex3').style.visibility = 'visible';
}

function simplify(str) { 
    var result = '', data = str.split('/'), 
        numOne = Number(data[0]), 
        numTwo = Number(data[1]); 
    for (var i = Math.max(numOne, numTwo); i > 1; i--) { 
        if ((numOne % i == 0) && (numTwo % i == 0)) { 
            numOne /= i; 
            numTwo /= i; 
        }
    }
    if (numTwo === 1) { 
        result = numOne.toString();
    } else { 
        result = numOne.toString() + '/' + numTwo.toString();
    } 
    return result;
}

function nextProb3() {
    a3 = Math.floor(Math.random()*9) - 4;
    while (a3 == 0) {
        a3 = Math.floor(Math.random()*9) - 4;
    }
    b3 = Math.floor(Math.random()*41) - 20;
    c3 = Math.floor(Math.random()*41) - 20;
    if (a3 > 0) {
        if (b3 > 0) {
            h3 = String.raw`-` + b3 + String.raw`/` + 2 * a3;
        } else {
            h3 = -b3 + String.raw`/` + 2 * a3;
        }
    } else {
        if (b3 > 0) {
            h3 = b3 + String.raw`/` + 2 * -a3;
        } else {
            h3 = String.raw`-` + -b3 + String.raw`/` + 2 * -a3;
        }
    }
    
    h3 = simplify(h3);

    if (a3 == 1) {
        displayedQuad3 = String.raw`\(f(x)=x^2`;
    } else if (a3 == -1) {
        displayedQuad3 = String.raw`\(f(x)=-x^2`;
    } else {
        displayedQuad3 = String.raw`\(f(x)=` + a3 + String.raw`x^2`;
    }
    
    if (b3 > 0) {
        if (b3 == 1) {
            displayedQuad3 = displayedQuad3 + '+x';
        } else {
            displayedQuad3 = displayedQuad3 + '+' + b3 + 'x';
        }        
    } else if (b3 < 0) {
        if (b3 == -1) {
            displayedQuad3 = displayedQuad3 + '-x';
        } else {
            displayedQuad3 = displayedQuad3 + '-' + -b3 + 'x';
        }
        
    }
    
    if (c3 > 0) {
        displayedQuad3 = displayedQuad3 + '+' + c3;
    } else if (c3 < 0) {
        displayedQuad3 = displayedQuad3 + '-' + -c3;
    }
    displayedQuad3 = displayedQuad3 + String.raw`\)`;
    
    document.getElementById('problem3').innerHTML = displayedQuad3;
    MathJax.typeset();
    
    document.getElementById('quadVertex3').value = '';
    
    clearResult3();
}

function check3() {
    var vertexToTest3 = document.getElementById('quadVertex3').value;
    
    if (vertexToTest3 == h3) {
        isCorrect3(true);
    } else {
        isCorrect3(false);
    }

    updateScore3();
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