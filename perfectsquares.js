// SET-UP
var numberCorrect = 0,
    numberGuesses = 0,
    hasIncreased = 0;

function resetScoreboard() {
    numberCorrect = 0;
    hasIncreased = 0;
    numberGuesses = 0;
    document.getElementById("correct").innerHTML = "0";
    document.getElementById("guesses").innerHTML = "0";
    document.getElementById("percent").innerHTML = "0";
}

function updateScore() {
    document.getElementById("correct").innerHTML = numberCorrect;
    document.getElementById("guesses").innerHTML = numberGuesses;
    document.getElementById("percent").innerHTML = Math.floor((numberCorrect / numberGuesses) * 100) + "%";
}

var whichIncorrect = 0,
    incorrectResponses = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

function isCorrect(correct) {
    if (hasIncreased == 0) {
        numberGuesses++;
    }
    if (correct) {
        numberCorrect++;
        hasIncreased = 1;
        document.getElementById("result").innerHTML = '<h2 style="color: green">Correct!</h2>';
        document.getElementById("check").style.visibility = "hidden";
        document.getElementById("nextProb").style.visibility = "visible";
    } else {
        document.getElementById("result").innerHTML =
            '<h2 style="color: darkred">' + incorrectResponses[whichIncorrect] + "</h2>";
        whichIncorrect++;
        if (whichIncorrect == incorrectResponses.length) {
            whichIncorrect = 0;
        }
    }
    document.getElementById("result").style.visibility = "visible";

    if (numberCorrect == 10) {
        throwConfetti();
    }
}

function throwConfetti() {
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.style.position = "fixed";
    fullscreenDiv.style.top = 0;
    fullscreenDiv.style.left = 0;
    fullscreenDiv.style.width = "100%";
    fullscreenDiv.style.height = "100%";
    fullscreenDiv.style.backgroundColor = "transparent";
    fullscreenDiv.style.zIndex = 9999;

    const gifImage = document.createElement("img");
    gifImage.src = "Images/confetti.gif";
    gifImage.style.width = "100%";
    gifImage.style.height = "100%";
    gifImage.style.objectFit = "contain";

    fullscreenDiv.appendChild(gifImage);

    document.body.appendChild(fullscreenDiv);

    const cleanUp = setTimeout(cleanUpConfetti, 2000, fullscreenDiv);
}

function cleanUpConfetti(thing) {
    document.body.removeChild(thing);
}

// PAGE SPECIFIC
function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
}

function clearResult() {
    document.getElementById("result").innerHTML = '<h2 style="color: green">--</h2>';
    document.getElementById("result").style.visibility = "hidden";
    hasIncreased = 0;
    document.getElementById("check").style.visibility = "visible";
    document.getElementById("nextProb").style.visibility = "hidden";
    document.getElementById("startFresh").innerHTML = "Start Fresh";
    var current;
    for (let i = 1; i < 26; i++) {
        current = document.getElementById("sq" + i);
        current.style.backgroundColor = "white";
        current.value = "";
    }
    document.getElementById("sqTable").style.visibility = "visible";
    MathJax.typeset();
}

function debug() {
    var temp = "Stuff here\n";
    alert(temp);
}

function nextProb() {
    // Build the problem here
    clearResult();
}

function check() {
    var allCorrect = true, current;

    // check that inputs match the answers
    for (let i = 1; i < 26; i++) {
        current = document.getElementById("sq" + i);
        if (current.value == current.dataset.solution) {
            current.style.backgroundColor = "lightgreen";
        } else {
            current.style.backgroundColor = "lightcoral";
            allCorrect = false;
        }
    }
    
    if (allCorrect) {
        isCorrect(true);
    } else {
        isCorrect(false);
    }

    updateScore();
}

// SET-UP RANDOM PERFECT SQUARES
var numberCorrect2 = 0,
    numberGuesses2 = 0,
    hasIncreased2 = 0;

function resetScoreboard2() {
    numberCorrect2 = 0;
    hasIncreased2 = 0;
    numberGuesses2 = 0;
    document.getElementById("correct2").innerHTML = "0";
    document.getElementById("guesses2").innerHTML = "0";
    document.getElementById("percent2").innerHTML = "0";
}

function updateScore2() {
    document.getElementById("correct2").innerHTML = numberCorrect2;
    document.getElementById("guesses2").innerHTML = numberGuesses2;
    document.getElementById("percent2").innerHTML = Math.floor((numberCorrect2 / numberGuesses2) * 100) + "%";
}

var whichIncorrect2 = 0,
    incorrectResponses2 = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

function isCorrect2(correct) {
    if (hasIncreased2 == 0) {
        numberGuesses2++;
    }
    if (correct) {
        numberCorrect2++;
        hasIncreased2 = 1;
        document.getElementById("result2").innerHTML = '<h2 style="color: green">Correct!</h2>';
        document.getElementById("check2").style.visibility = "hidden";
        document.getElementById("nextProb2").style.visibility = "visible";
    } else {
        document.getElementById("result2").innerHTML =
            '<h2 style="color: darkred">' + incorrectResponses2[whichIncorrect2] + "</h2>";
        whichIncorrect2++;
        if (whichIncorrect2 == incorrectResponses2.length) {
            whichIncorrect2 = 0;
        }
    }
    document.getElementById("result2").style.visibility = "visible";

    if (numberCorrect2 == 14) {
        throwConfetti();
    }
}

function clearResult2() {
    document.getElementById("result2").innerHTML = '<h2 style="color: green">--</h2>';
    document.getElementById("result2").style.visibility = "hidden";
    hasIncreased2 = 0;
    document.getElementById("check2").style.visibility = "visible";
    document.getElementById("nextProb2").style.visibility = "hidden";
    document.getElementById("startFresh2").innerHTML = "Start Fresh";
}

function throwConfetti2() {
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.style.position = "fixed";
    fullscreenDiv.style.top = 0;
    fullscreenDiv.style.left = 0;
    fullscreenDiv.style.width = "100%";
    fullscreenDiv.style.height = "100%";
    fullscreenDiv.style.backgroundColor = "transparent";
    fullscreenDiv.style.zIndex = 9999;

    const gifImage = document.createElement("img");
    gifImage.src = "Images/confetti.gif";
    gifImage.style.width = "100%";
    gifImage.style.height = "100%";
    gifImage.style.objectFit = "contain";

    fullscreenDiv.appendChild(gifImage);

    document.body.appendChild(fullscreenDiv);

    const cleanUp = setTimeout(cleanUpConfetti2, 2000, fullscreenDiv);
}

function cleanUpConfetti2(thing) {
    document.body.removeChild(thing);
}

function startFresh2() {
    resetScoreboard2();
    nextProb2();
} 

var initialValue = 1, perfSQ = 1;

function nextProb2() {
    initialValue = Math.floor(Math.random()*25) + 1;
    perfSQ = initialValue * initialValue;
    document.getElementById("answerInput2Label").innerHTML = String.raw`\(` + initialValue + String.raw`^2=\)`;

    clearResult2();
    resetInputs2();
}

function resetInputs2() {
    // Display the build function and reset the inputs
    document.getElementById("answerInput2").value = "";
    MathJax.typeset();

    // get inputs by ID and set .value to 0 or ""
}

function check2() {
    var allCorrect2 = true;
    if (document.getElementById("answerInput2").value == perfSQ) {
        isCorrect2(true);
    } else {
        isCorrect2(false);
    }

    updateScore2();
}

// SET-UP RANDOM PERFECT SQUARES
var numberCorrect3 = 0,
    numberGuesses3 = 0,
    hasIncreased3 = 0;

function resetScoreboard3() {
    numberCorrect3 = 0;
    hasIncreased3 = 0;
    numberGuesses3 = 0;
    document.getElementById("correct3").innerHTML = "0";
    document.getElementById("guesses3").innerHTML = "0";
    document.getElementById("percent3").innerHTML = "0";
}

function updateScore3() {
    document.getElementById("correct3").innerHTML = numberCorrect3;
    document.getElementById("guesses3").innerHTML = numberGuesses3;
    document.getElementById("percent3").innerHTML = Math.floor((numberCorrect3 / numberGuesses3) * 100) + "%";
}

var whichIncorrect3 = 0,
    incorrectResponses3 = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

function isCorrect3(correct) {
    if (hasIncreased3 == 0) {
        numberGuesses3++;
    }
    if (correct) {
        numberCorrect3++;
        hasIncreased3 = 1;
        document.getElementById("result3").innerHTML = '<h2 style="color: green">Correct!</h2>';
        document.getElementById("check3").style.visibility = "hidden";
        document.getElementById("nextProb3").style.visibility = "visible";
    } else {
        document.getElementById("result3").innerHTML =
            '<h2 style="color: darkred">' + incorrectResponses3[whichIncorrect3] + "</h2>";
        whichIncorrect3++;
        if (whichIncorrect3 == incorrectResponses3.length) {
            whichIncorrect3 = 0;
        }
    }
    document.getElementById("result3").style.visibility = "visible";

    if (numberCorrect3 == 14) {
        throwConfetti();
    }
}

function clearResult3() {
    document.getElementById("result3").innerHTML = '<h2 style="color: green">--</h2>';
    document.getElementById("result3").style.visibility = "hidden";
    hasIncreased3 = 0;
    document.getElementById("check3").style.visibility = "visible";
    document.getElementById("nextProb3").style.visibility = "hidden";
    document.getElementById("startFresh3").innerHTML = "Start Fresh";
}

function throwConfetti3() {
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.style.position = "fixed";
    fullscreenDiv.style.top = 0;
    fullscreenDiv.style.left = 0;
    fullscreenDiv.style.width = "100%";
    fullscreenDiv.style.height = "100%";
    fullscreenDiv.style.backgroundColor = "transparent";
    fullscreenDiv.style.zIndex = 9999;

    const gifImage = document.createElement("img");
    gifImage.src = "Images/confetti.gif";
    gifImage.style.width = "100%";
    gifImage.style.height = "100%";
    gifImage.style.objectFit = "contain";

    fullscreenDiv.appendChild(gifImage);

    document.body.appendChild(fullscreenDiv);

    const cleanUp = setTimeout(cleanUpConfetti3, 2000, fullscreenDiv);
}

function cleanUpConfetti3(thing) {
    document.body.removeChild(thing);
}

function startFresh3() {
    resetScoreboard3();
    nextProb3();
} 

var initialValue3 = 1, perfSQ3 = 1;

function nextProb3() {
    initialValue3 = 10 * Math.floor(Math.random()*10) + 5;
    var power10 = Math.floor(Math.random()*3);
    perfSQ3 = initialValue3 * initialValue3;
    initialValue3 = initialValue3 / Math.pow(10, power10);
    perfSQ3 = perfSQ3 / (Math.pow(10, power10) * Math.pow(10, power10));
    document.getElementById("answerInput3Label").innerHTML = String.raw`\(` + initialValue3 + String.raw`^2=\)`;

    clearResult3();
    resetInputs3();
}

function resetInputs3() {
    // Display the build function and reset the inputs
    document.getElementById("answerInput3").value = "";
    MathJax.typeset();

    // get inputs by ID and set .value to 0 or ""
}

function check3() {
    var allCorrect3 = true;
    if (document.getElementById("answerInput3").value == perfSQ3) {
        isCorrect3(true);
    } else {
        isCorrect3(false);
    }

    updateScore3();
}