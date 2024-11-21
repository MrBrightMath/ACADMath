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
    for (let i = 1; i < 11; i++) {
        current = document.getElementById("cb" + i);
        current.style.backgroundColor = "white";
        current.value = "";
    }
    document.getElementById("cbTable").style.visibility = "visible";
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
    for (let i = 1; i < 11; i++) {
        current = document.getElementById("cb" + i);
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

var initialValue = 1, perfCB = 1;

function nextProb2() {
    initialValue = Math.floor(Math.random()*10) + 1;
    perfCB = initialValue * initialValue * initialValue;
    document.getElementById("answerInput2Label").innerHTML = String.raw`\(` + initialValue + String.raw`^3=\)`;

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
    if (document.getElementById("answerInput2").value == perfCB) {
        isCorrect2(true);
    } else {
        isCorrect2(false);
    }

    updateScore2();
}