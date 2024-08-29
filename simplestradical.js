let irrArray = [1,1,2,2,2,2,3,3,3,3,5,5,5,5,6,6,6,7,7,7,9,9,10,10,11];

var ratSolution = 0, irrSolution = 0, numberCorrect = 0, numberGuesses = 0; hasIncreased = 0, whichIncorrect = 0, incorrectResponses = ["Not quite, but keep at it!", "I'm sorry, but give it another go!", "No, but don't give up!"];

function startFresh() {
    numberCorrect = 0;
    hasIncreased = 0;
    numberGuesses = 0;
    document.getElementById("numberCorrect").innerHTML = "<p>Correct: 0</p>";
    document.getElementById("numberGuesses").innerHTML = "<p>Guesses: 0</p>";
    document.getElementById("percentCorrect").innerHTML = "<p>Percent: 0</p>";
    getRad();
}

function getRad() {
    ratSolution = Math.floor(Math.random()*10) + 1;
    irrSolution = irrArray[Math.floor(Math.random()*irrArray.length)];
    var newRad = ratSolution * ratSolution * irrSolution;
    radToDisplay = String.raw`\(\sqrt{` + newRad + String.raw`}\)`;
    
    document.getElementById("radical").innerHTML = radToDisplay;
    MathJax.typeset();
    
    var resultText = document.getElementById("result");
    
    resultText.innerHTML = '';
    
    document.getElementById("rational").value = '';
    document.getElementById("irrational").value = '';
    
    hasIncreased = 0;
    
    document.getElementById("testRad").style.visibility = "visible";
    document.getElementById("nextRad").style.visibility = "hidden";
    document.getElementById("startFresh").innerHTML = "Start Fresh";
}

function testRad() {
    if (hasIncreased == 0) {
        numberGuesses++;
        whichIncorrect++;
        if (whichIncorrect > 2) {
            whichIncorrect = 0;
        }
    }
    
    var guessedRat;
    if (document.getElementById("rational").value == '') {
        guessedRat = 1;
    } else {
        guessedRat = parseInt(document.getElementById("rational").value);
    }
    
    var guessedIrr;
    if (document.getElementById("irrational").value == '') {
        guessedIrr = 1;
    } else {
        guessedIrr = parseInt(document.getElementById("irrational").value);
    }
    
    if (guessedRat == ratSolution && guessedIrr == irrSolution) {
        document.getElementById("result").innerHTML = "<h1>Correct!</h1>";
        if (hasIncreased == 0) {
            numberCorrect++;
            hasIncreased = 1;
            document.getElementById("testRad").style.visibility = "hidden";
            document.getElementById("nextRad").style.visibility = "visible";
        }
    } else {
        document.getElementById("result").innerHTML = "<h1>" + incorrectResponses[whichIncorrect] + "</h1>";
    }
    
    document.getElementById("numberGuesses").innerHTML = '<p>Guesses: ' + numberGuesses + '</p>';
    document.getElementById("numberCorrect").innerHTML = '<p>Correct: ' + numberCorrect + '</p>';
    document.getElementById("percentCorrect").innerHTML = '<p>Percent: ' + Math.floor(numberCorrect/numberGuesses * 100) + '%</p>';
}