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

function clearResult() {
    document.getElementById("result").innerHTML = '<h2 style="color: green">--</h2>';
    document.getElementById("result").style.visibility = "hidden";
    hasIncreased = 0;
    document.getElementById("check").style.visibility = "visible";
    document.getElementById("nextProb").style.visibility = "hidden";
    document.getElementById("startFresh").innerHTML = "Start Fresh";
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
function debug() {
    var temp = "Stuff here\n";
    alert(temp);
}

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
    [9, "Constant", "constantEQ.png", "constantGraph.png"]
];

var pfCopy = Array.from(geoParentFunctions);

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function startFresh() {
    resetScoreboard();
    clearResult();
    pfCopy = Array.from(geoParentFunctions);
    nextProb();
} 

function nextProb() {
    var shuffledPF = shuffle(pfCopy);
    var nameDiv = document.getElementById("nameDiv");
    nameDiv.innerHTML = "";
    
    //Get random name into first grid
    var nameRadio = document.createElement("input");
    nameRadio.type = "radio";
    nameRadio.id = "name0";
    nameRadio.value = shuffledPF[0][0];
    nameRadio.name = "pfName";
    nameRadio.checked = true;
    nameRadio.style.visibility = "hidden";
    var nameLabel = document.createElement("label");
    nameLabel.htmlFor = "name0";
    nameLabel.style.fontSize = "36px";
    var description = document.createTextNode(" " + shuffledPF[0][1]);
    nameLabel.appendChild(description);
    nameDiv.appendChild(nameRadio);
    nameDiv.appendChild(nameLabel);
    
    //Shuffle again and set EQ
    shuffledPF = shuffle(pfCopy);
    var eqFlkty = new Flickity('.eq-gallery');
    while (eqFlkty.cells.length > 0) {
        eqFlkty.remove(eqFlkty.cells[eqFlkty.cells.length - 1].element);
    }
    for (i = 0; i < shuffledPF.length; i++) {
        var eqRadio = document.createElement("input");
        eqRadio.type = "radio";
        eqRadio.id = "eq" + i;
        eqRadio.value = shuffledPF[i][0];
        eqRadio.name = "pfEQ";
        var eqLabel = document.createElement("label");
        eqLabel.htmlFor = "eq" + i;
        eqLabel.innerHTML = '<img src="Images/' + shuffledPF[i][2] + '" >';
        var newEQDiv = document.createElement("div");
        newEQDiv.className = "vertCent eqCard";
        newEQDiv.appendChild(eqRadio);
        newEQDiv.appendChild(eqLabel);
        var newEQCell = document.createElement('div');
        newEQCell.className = 'eq-gallery-cell';
        newEQCell.id = "eqCell" + i;
        newEQCell.appendChild(newEQDiv);
        eqFlkty.append( newEQCell );
    }

    //Shuffle again and set graphs
    shuffledPF = shuffle(pfCopy);
    var graphFlkty = new Flickity('.graph-gallery');
    while (graphFlkty.cells.length > 0) {
        graphFlkty.remove(graphFlkty.cells[graphFlkty.cells.length - 1].element);
    }
    for (i = 0; i < shuffledPF.length; i++) {
        //Set Graphs
        var graphRadio = document.createElement("input");
        graphRadio.type = "radio";
        graphRadio.id = "graph" + i;
        graphRadio.value = shuffledPF[i][0];
        graphRadio.name = "pfGraph";
        var graphLabel = document.createElement("label");
        graphLabel.htmlFor = "graph" + i;
        graphLabel.innerHTML = '<img src="Images/' + shuffledPF[i][3] + '" height="200" >';
        var newGraphDiv = document.createElement("div");
        newGraphDiv.className = "vertImg graphCard";
        newGraphDiv.appendChild(graphRadio);
        newGraphDiv.appendChild(graphLabel);
        var newGraphCell = document.createElement("div");
        newGraphCell.className = "graph-gallery-cell";
        newGraphCell.id = "graphCell" + i;
        newGraphCell.appendChild(newGraphDiv);
        
        graphFlkty.append( newGraphCell );
    }

    clearResult();
    resetInputs();
}

function resetInputs() {
    // Display the build function and reset the inputs
    MathJax.typeset();

    // get inputs by ID and set .value to 0 or ""
}

function check() {
    var nameRadio = document.getElementsByName("pfName"),
        selectedName = 0;
    selectedName = nameRadio[0].value;

    var eqRadio = document.getElementsByName("pfEQ"),
        selectedEQ = 0;
    for (i = 0; i < eqRadio.length; i++) {
        if (eqRadio[i].checked) selectedEQ = eqRadio[i].value;
    }

    var graphRadio = document.getElementsByName("pfGraph"),
        selectedGraph = 0;
    for (i = 0; i < graphRadio.length; i++) {
        if (graphRadio[i].checked) selectedGraph = graphRadio[i].value;
    }

    var checkContainer = document.getElementById("checkDiv"),
        indexToEliminate = 0;
    if (selectedName == selectedEQ && selectedEQ == selectedGraph) {
        //Remove correct answer from array named pfCopy

        for (i = 0; i < pfCopy.length; i++) {
            if (pfCopy[i][0] == selectedName) {
                indexToEliminate = i;
            }
        }
        pfCopy.splice(indexToEliminate, 1);
        isCorrect(true);
    } else {
        isCorrect(false);
    }

    updateScore();
    if (pfCopy.length == 0) {
        document.getElementById("check").style.visibility = "hidden";
        document.getElementById("nextProb").style.visibility = "hidden";
        document.getElementById("result").innerHTML = '<h2 style="color: green">You correctly matched all parent functions!</h2>';
    }
}

// PRE-CALCULUS
// SET-UP
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

// PAGE SPECIFIC
function debug2() {
    var temp = "Stuff here\n";
    alert(temp);
}

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

var pfCopy2 = Array.from(pcParentFunctions);

function startFresh2() {
    resetScoreboard2();
    clearResult2();
    pfCopy2 = Array.from(pcParentFunctions);
    nextProb2();
} 

function nextProb2() {
    var shuffledPF2 = shuffle(pfCopy2);
    var nameDiv2 = document.getElementById("nameDiv2");
    nameDiv2.innerHTML = "";
    
    //Get random name into first grid
    var nameRadio2 = document.createElement("input");
    nameRadio2.type = "radio";
    nameRadio2.id = "pcname0";
    nameRadio2.value = shuffledPF2[0][0];
    nameRadio2.name = "pfName2";
    nameRadio2.checked = true;
    nameRadio2.style.visibility = "hidden";
    var nameLabel2 = document.createElement("label");
    nameLabel2.htmlFor = "pcname0";
    nameLabel2.style.fontSize = "36px";
    var description2 = document.createTextNode(" " + shuffledPF2[0][1]);
    nameLabel2.appendChild(description2);
    nameDiv2.appendChild(nameRadio2);
    nameDiv2.appendChild(nameLabel2);
    
    //Shuffle again and set EQ
    shuffledPF2 = shuffle(pfCopy2);
    var eqFlkty2 = new Flickity('.eq-gallery2');
    while (eqFlkty2.cells.length > 0) {
        eqFlkty2.remove(eqFlkty2.cells[eqFlkty2.cells.length - 1].element);
    }
    for (i = 0; i < shuffledPF2.length; i++) {
        var eqRadio2 = document.createElement("input");
        eqRadio2.type = "radio";
        eqRadio2.id = "pceq" + i;
        eqRadio2.value = shuffledPF2[i][0];
        eqRadio2.name = "pfEQ2";
        var eqLabel2 = document.createElement("label");
        eqLabel2.htmlFor = "pceq" + i;
        eqLabel2.innerHTML = '<img src="Images/' + shuffledPF2[i][2] + '" >';
        var newEQDiv2 = document.createElement("div");
        newEQDiv2.className = "vertCent eqCard";
        newEQDiv2.appendChild(eqRadio2);
        newEQDiv2.appendChild(eqLabel2);
        var newEQCell2 = document.createElement('div');
        newEQCell2.className = 'eq-gallery-cell';
        newEQCell2.id = "pceqCell" + i;
        newEQCell2.appendChild(newEQDiv2);
        eqFlkty2.append( newEQCell2 );
    }

    //Shuffle again and set graphs
    shuffledPF2 = shuffle(pfCopy2);
    var graphFlkty2 = new Flickity('.graph-gallery2');
    while (graphFlkty2.cells.length > 0) {
        graphFlkty2.remove(graphFlkty2.cells[graphFlkty2.cells.length - 1].element);
    }
    for (i = 0; i < shuffledPF2.length; i++) {
        //Set Graphs
        var graphRadio2 = document.createElement("input");
        graphRadio2.type = "radio";
        graphRadio2.id = "pcgraph" + i;
        graphRadio2.value = shuffledPF2[i][0];
        graphRadio2.name = "pfGraph2";
        var graphLabel2 = document.createElement("label");
        graphLabel2.htmlFor = "pcgraph" + i;
        graphLabel2.innerHTML = '<img src="Images/' + shuffledPF2[i][3] + '" height="200" >';
        var newGraphDiv2 = document.createElement("div");
        newGraphDiv2.className = "vertImg graphCard";
        newGraphDiv2.appendChild(graphRadio2);
        newGraphDiv2.appendChild(graphLabel2);
        var newGraphCell2 = document.createElement("div");
        newGraphCell2.className = "graph-gallery-cell";
        newGraphCell2.id = "pcgraphCell" + i;
        newGraphCell2.appendChild(newGraphDiv2);
        
        graphFlkty2.append( newGraphCell2 );
    }

    clearResult2();
    resetInputs2();
}

function resetInputs2() {
    // Display the build function and reset the inputs
    MathJax.typeset();

    // get inputs by ID and set .value to 0 or ""
}

function check2() {
    var nameRadio2 = document.getElementsByName("pfName2"),
        selectedName2 = 0;
    selectedName2 = nameRadio2[0].value;

    var eqRadio2 = document.getElementsByName("pfEQ2"),
        selectedEQ2 = 0;
    for (i = 0; i < eqRadio2.length; i++) {
        if (eqRadio2[i].checked) selectedEQ2 = eqRadio2[i].value;
    }

    var graphRadio2 = document.getElementsByName("pfGraph2"),
        selectedGraph2 = 0;
    for (i = 0; i < graphRadio2.length; i++) {
        if (graphRadio2[i].checked) selectedGraph2 = graphRadio2[i].value;
    }

    var checkContainer2 = document.getElementById("checkDiv2"),
        indexToEliminate2 = 0;
    if (selectedName2 == selectedEQ2 && selectedEQ2 == selectedGraph2) {
        //Remove correct answer from array named pfCopy

        for (i = 0; i < pfCopy2.length; i++) {
            if (pfCopy2[i][0] == selectedName2) {
                indexToEliminate2 = i;
            }
        }
        pfCopy2.splice(indexToEliminate2, 1);
        isCorrect2(true);
    } else {
        isCorrect2(false);
    }

    updateScore2();
    if (pfCopy2.length == 0) {
        document.getElementById("check2").style.visibility = "hidden";
        document.getElementById("nextProb2").style.visibility = "hidden";
        document.getElementById("result2").innerHTML = '<h2 style="color: green">You correctly matched all parent functions!</h2>';
    }
}
