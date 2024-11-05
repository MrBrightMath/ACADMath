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

function updateScore2() {
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

var coeffArray = [1, 1, 1, 1, 1, 1, 1, 2, 2, 3], m1 = 0, b1 = 0, m2 = 0, b2 = 0, displayedQuad = '', linearTerm = '', constantTerm = '';

function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
}

function nextProb() {
    m1 = Math.floor(Math.random()*2) + 2;
    b1 = Math.floor(Math.random()*21) - 10;
    while (b1 == 0) {
        b1 = Math.floor(Math.random()*21) - 10;
    }
    if (b1 != 0) {
        while (b1 % m1 == 0) {
            b1 = Math.floor(Math.random()*21) - 10;
            while (b1 == 0) {
                b1 = Math.floor(Math.random()*21) - 10;
            }
        }
    }
    m2 = coeffArray[Math.floor(Math.random()*coeffArray.length)];
    b2 = Math.floor(Math.random()*11) - 5;
    while (b2 == 0) {
        b2 = Math.floor(Math.random()*11) - 5;
    }
    if (b2 != 0 && m2 > 1) {
        while (b2 % m2 == 0) {
            b2 = Math.floor(Math.random()*11) - 5;
            while (b2 == 0) {
                b2 = Math.floor(Math.random()*11) - 5;
            }
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
    
    displayedQuad = String.raw`\(f(x)=` + a + String.raw`x^2` + linearTerm + constantTerm + String.raw`\)`;
    
    document.getElementById('problem').innerHTML = displayedQuad;
    MathJax.typeset();
    
    document.getElementById('factoredForm').value = '';
    document.getElementById('zero1').value = '';
    document.getElementById('zero2').value = '';
    document.getElementById("factoredForm").style.backgroundColor = "white";
    document.getElementById("zero1").style.backgroundColor = "white";
    document.getElementById("zero2").style.backgroundColor = "white";
    
    clearResult();
}

// define the _removeSpaces(value) function
function _removeSpaces(v){
	// remove all spaces
	while( v.indexOf(" ") > -1 ) v = v.substring( 0, v.indexOf(" ") ) + v.substring( v.indexOf(" ")+1 );
	return v;
}

function gcd(a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}

function check() {
    var m1Coeff, m2Coeff, factorToTest = _removeSpaces(document.getElementById('factoredForm').value), firstFactor, secondFactor, possibleSolutions = [];
    var aTimesC = m1 * m2 * b1 * b2, factor1 = m1 * b2, factor2 = m2 * b1, splitTerm = [], splitToTest = _removeSpaces(document.getElementById('splitTerm').value);
    
    // Build split middle term
    var a = m1 * m2, c = b1 * b2, split1 = a + "x^2", split2 = a + "x^2";
    if (factor1 > 0) {
        split1 = split1 + "+" + factor1 + "x";
    } else {
        split1 = split1 + factor1 + "x";
    }
    if (factor2 > 0) {
        split1 = split1 + "+" + factor2 + "x";
    } else {
        split1 = split1 + factor2 + "x";
    }
    if (c > 0) {
        split1 = split1 + "+" + c;
    } else {
        split1 = split1 + c;
    }
    splitTerm.push(split1);

    if (factor2 > 0) {
        split2 = split2 + "+" + factor2 + "x";
    } else {
        split2 = split2 + factor2 + "x";
    }
    if (factor1 > 0) {
        split2 = split2 + "+" + factor1 + "x";
    } else {
        split2 = split2 + factor1 + "x";
    }
    if (c > 0) {
        split2 = split2 + "+" + c;
    } else {
        split2 = split2 + c;
    }
    splitTerm.push(split2);
    
    
    // Build final factored form
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
    
    if (b1 > 0) {
        firstFactor = "(" + m1Coeff + "x+" + b1 + ")";
    } else {
        firstFactor = "(" + m1Coeff + "x-" + Math.abs(b1) + ")";
    }
    
    if (b2 > 0) {
        secondFactor = "(" + m2Coeff + "x+" + b2 + ")";
    } else {
        secondFactor = "(" + m2Coeff + "x-" + Math.abs(b2) + ")";
    }
    possibleSolutions.push(firstFactor + secondFactor);
    possibleSolutions.push(secondFactor + firstFactor);
    
    var group1, group2, groups = [], groupToTest = document.getElementById("GCFFactored").value;
    group1 = m2Coeff + "x" + firstFactor;
    if (b2 > 0) {
        group1 += "+" + b2 + firstFactor;
    } else {
        group1 += b2 + firstFactor;
    }
    group2 = m1Coeff + "x" + secondFactor;
    if (b1 > 0) {
        group2 += "+" + b1 + secondFactor;
    } else {
        group2 += b1 + secondFactor;
    }
    groups.push(group1);
    groups.push(group2);
    
    var allCorrect = true;
    
    if (aTimesC != document.getElementById("aTimesC").value) {
        document.getElementById("aTimesC").style.backgroundColor = "lightcoral";
        allCorrect = false;
    } else {
        document.getElementById("aTimesC").style.backgroundColor = "lightgreen";
    }
    
    if (factor1 != document.getElementById("factor1").value && factor2 != document.getElementById("factor1").value) { // ADD AND != 2
        document.getElementById("factor1").style.backgroundColor = "lightcoral";
        allCorrect = false;
    } else {
        document.getElementById("factor1").style.backgroundColor = "lightgreen";
    }
    
    if (factor1 != document.getElementById("factor2").value && factor2 != document.getElementById("factor2").value) { // ADD AND != 2
        document.getElementById("factor2").style.backgroundColor = "lightcoral";
        allCorrect = false;
    } else {
        document.getElementById("factor2").style.backgroundColor = "lightgreen";
    }
    
    if (splitTerm.includes(splitToTest)) {
        document.getElementById("splitTerm").style.backgroundColor = "lightgreen";
    } else {
        document.getElementById("splitTerm").style.backgroundColor = "lightcoral";
        allCorrect = false;
    }
    
    if (groups.includes(groupToTest)) {
        document.getElementById("GCFFactored").style.backgroundColor = "lightgreen";
    } else {
        document.getElementById("GCFFactored").style.backgroundColor = "lightcoral";
        allCorrect = false;
    }
    
    if (possibleSolutions.includes(factorToTest)) {
        a = m1 * m2;
        displayedQuad = String.raw`\(f(x)=` + a + String.raw`x^2` + linearTerm + constantTerm + "=" + factorToTest + String.raw`\)`;
        document.getElementById("factoredForm").style.backgroundColor = "lightgreen";
    } else {
        document.getElementById("factoredForm").style.backgroundColor = "lightcoral";
        allCorrect = false;
    }
    
    if (document.getElementById("zero1").value != simplifyFraction(-b1, m1).typed && document.getElementById("zero1").value != simplifyFraction(-b2, m2).typed) {
        allCorrect = false;
        document.getElementById("zero1").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("zero1").style.backgroundColor = "lightgreen";
    }

    if (document.getElementById("zero2").value != simplifyFraction(-b1, m1).typed && document.getElementById("zero2").value != simplifyFraction(-b2, m2).typed) {
        allCorrect = false;
        document.getElementById("zero2").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("zero2").style.backgroundColor = "lightgreen";
    }

    isCorrect(allCorrect);
    
    document.getElementById('problem').innerHTML = displayedQuad;
    MathJax.typeset();

    updateScore2();
}

function simplifyFraction(numerator, denonminator) {
    var mathjax = "",
        typed = "",
        sign = "";
    if (numerator != 0) {
        for (var i = Math.max(numerator, denonminator); i > 1; i--) {
            if (numerator % i == 0 && denonminator % i == 0) {
                numerator /= i;
                denonminator /= i;
            }
        }
        if (numerator < 0) {
            sign = "-";
        }
        if (denonminator === 1) {
            mathjax = numerator.toString();
            typed = numerator.toString();
        } else {
            mathjax = sign + String.raw`\frac{` + Math.abs(numerator).toString() + "}{" + denonminator.toString() + "}";
            typed = numerator.toString() + "/" + denonminator.toString();
        }
    } else {
        mathjax = 0;
        typed = 0;
    }
    return {
        value: numerator / denonminator,
        numerator: numerator,
        denominator: denonminator,
        mathjax: mathjax,
        typed: typed
    };
}
