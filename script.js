// BEGIN PARENT FUNCTION JS
let geoParentFunctions = [
    [0, "Linear", "linearEQ.png", "linearGraph.png"],
    [1, "Quadratic", "quadEQ.png", "quadGraph.png"],
    [2, "Cubic", "cubicEQ.png", "cubicGraph.png"],
    [3, "Square Root", "sqrtEQ.png", "sqrtGraph.png"],
    [4, "Cube Root", "cbrtEQ.png", "cbrtGraph.png"],
    [5, "Absolute Value", "absEQ.png", "absGraph.png"],
    [6, "Exponential Growth", "expGrowthEQ.png", "expGrowthGraph.png"],
    [7, "Exponential Decay", "expDecayEQ.png", "expDecayGraph.png"],
    [8, "Inverse", "inverseEQ.png", "inverseGraph.png"],
    [9, "Constant", "constantEQ.png", "constantGraph.png"],
];

let pcParentFunctions = [
    [0, "Linear", "linearEQ.png", "linearGraph.png"],
    [1, "Quadratic", "quadEQ.png", "quadGraph.png"],
    [2, "Cubic", "cubicEQ.png", "cubicGraph.png"],
    [3, "Square Root", "sqrtEQ.png", "sqrtGraph.png"],
    [4, "Cube Root", "cbrtEQ.png", "cbrtGraph.png"],
    [5, "Absolute Value", "absEQ.png", "absGraph.png"],
    [6, "Exponential Growth", "expGrowthEQ.png", "expGrowthGraph.png"],
    [7, "Exponential Decay", "expDecayEQ.png", "expDecayGraph.png"],
    [8, "Inverse", "inverseEQ.png", "inverseGraph.png"],
    [9, "Constant", "constantEQ.png", "constantGraph.png"],
    [10, "Sine", "sineEQ.png", "sineGraph.png"],
    [11, "Cosine", "cosineEQ.png", "cosineGraph.png"],
    [12, "Tangent", "tangentEQ.png", "tangentGraph.png"],
    [13, "Log", "logEQ.png", "logGraph.png"]
];

var pfCopy = Array.from(geoParentFunctions);

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function clearGrids() {
    document.getElementById('checkDiv').innerHTML = '';
    document.getElementById('nameGrid').innerHTML = '';
    document.getElementById('eqGrid').innerHTML = '';
    document.getElementById('graphGrid').innerHTML = '';
}

function startPC() {
    pfCopy = Array.from(pcParentFunctions);
    continuePracGrid();
}

function startGeo() {
    pfCopy = Array.from(geoParentFunctions);
    continuePracGrid();
}

function continuePracGrid() {
    clearGrids();
    
    var shuffledPF = shuffle(pfCopy);
    var eqGrid = document.getElementById('eqGrid');
    var nameGrid = document.getElementById('nameGrid');
    var graphGrid = document.getElementById('graphGrid');
    
    //Get random name into first grid
    var nameRadio = document.createElement('input');
    nameRadio.type = 'radio';
    nameRadio.id = 'name0';
    nameRadio.value = shuffledPF[0][0];
    nameRadio.name = 'pfName';
    nameRadio.checked = true;
    var nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'name0';
    var description = document.createTextNode(shuffledPF[0][1]);
    nameLabel.appendChild(description);
    nameGrid.appendChild(nameRadio);
    nameGrid.appendChild(nameLabel);
    
    //Shuffle again and set EQ
    shuffledPF = shuffle(pfCopy);
    for (i = 0; i < shuffledPF.length; i++) {
        var eqRadio = document.createElement('input');
        eqRadio.type = 'radio';
        eqRadio.id = 'eq' + i;
        eqRadio.value = shuffledPF[i][0];
        eqRadio.name = 'pfEQ';
        var eqLabel = document.createElement('label');
        eqLabel.htmlFor = 'eq' + i;
        eqLabel.innerHTML = '<img src="Images/' + shuffledPF[i][2] + '" >';
        var newDiv = document.createElement('div');
        newDiv.className = 'vertCent';
        newDiv.appendChild(eqRadio);
        newDiv.appendChild(eqLabel);
        eqGrid.appendChild(newDiv);
    }
    
    //Shuffle again and set graphs
    shuffledPF = shuffle(pfCopy);
    for (i = 0; i < shuffledPF.length; i++) {
        //Set Graphs
        var graphRadio = document.createElement('input');
        graphRadio.type = 'radio';
        graphRadio.id = 'graph' + i;
        graphRadio.value = shuffledPF[i][0];
        graphRadio.name = 'pfGraph';
        var graphLabel = document.createElement('label');
        graphLabel.htmlFor = 'eq' + i;
        graphLabel.innerHTML = '<img src="Images/' + shuffledPF[i][3] + '" height="200" >';
        var newGraphDiv = document.createElement('div');
        newGraphDiv.className = 'vertImg';
        newGraphDiv.appendChild(graphRadio);
        newGraphDiv.appendChild(graphLabel);
        graphGrid.appendChild(newGraphDiv);
    }
}

function check() {
    var nameRadio = document.getElementsByName('pfName'), selectedName = 0;
    selectedName = nameRadio[0].value;
    
    var eqRadio = document.getElementsByName('pfEQ'), selectedEQ = 0;
    for (i = 0; i < eqRadio.length; i++) {
        if (eqRadio[i].checked)
            selectedEQ = eqRadio[i].value;
    }
    
    var graphRadio = document.getElementsByName('pfGraph'), selectedGraph = 0;
    for (i = 0; i < graphRadio.length; i++) {
        if (graphRadio[i].checked)
            selectedGraph = graphRadio[i].value;
    }
    
    var checkContainer = document.getElementById('checkDiv'), indexToEliminate = 0;
    if (selectedName == selectedEQ && selectedEQ == selectedGraph) {
        //Remove correct answer from array named pfCopy
        
        for (i = 0; i < pfCopy.length; i++) {
            if (pfCopy[i][0] == selectedName) {
                indexToEliminate = i;
            }
        }
        var nameText = pfCopy[indexToEliminate][1], eqPic = pfCopy[indexToEliminate][2], graphPic = pfCopy[indexToEliminate][3];
        pfCopy.splice(indexToEliminate,1);

        if (pfCopy.length > 0) {
            checkContainer.innerHTML = '<p class="correctAnswer">CORRECT!</p><p>' + nameText + '&emsp;&emsp; <img src="Images/' + eqPic + '" >&emsp;&emsp; ' + '<img src="Images/' + graphPic + '" height="100"></p><br />';
        } else {
            checkContainer.innerHTML = '<p class="correctAnswer">CORRECT!</p><p>' + nameText + '&emsp;&emsp; <img src="Images/' + eqPic + '" >&emsp;&emsp; ' + '<img src="Images/' + graphPic + '" height="100"></p><br /><h2>YOU CORRECTLY IDENTIFIED ALL PARENT FUNCTIONS!</h2>';
        }
        
    } else {
        checkContainer.innerHTML = '<p class="incorrectAnswer">Please try again.</p><br />';
    }
}

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