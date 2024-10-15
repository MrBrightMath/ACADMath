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
    [9, "Constant", "constantEQ.png", "constantGraph.png"]
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
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function clearGrids() {
    document.getElementById("checkDiv").innerHTML = "";
    document.getElementById("nameGrid").innerHTML = "";
    document.getElementById("eqGrid").innerHTML = "";
    document.getElementById("graphGrid").innerHTML = "";
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
    var eqGrid = document.getElementById("eqGrid");
    var nameGrid = document.getElementById("nameGrid");
    var graphGrid = document.getElementById("graphGrid");

    //Get random name into first grid
    var nameRadio = document.createElement("input");
    nameRadio.type = "radio";
    nameRadio.id = "name0";
    nameRadio.value = shuffledPF[0][0];
    nameRadio.name = "pfName";
    nameRadio.checked = true;
    var nameLabel = document.createElement("label");
    nameLabel.htmlFor = "name0";
    var description = document.createTextNode(" " + shuffledPF[0][1]);
    nameLabel.appendChild(description);
    nameGrid.appendChild(nameRadio);
    nameGrid.appendChild(nameLabel);

    //Shuffle again and set EQ
    shuffledPF = shuffle(pfCopy);
    for (i = 0; i < shuffledPF.length; i++) {
        var eqRadio = document.createElement("input");
        eqRadio.type = "radio";
        eqRadio.id = "eq" + i;
        eqRadio.value = shuffledPF[i][0];
        eqRadio.name = "pfEQ";
        var eqLabel = document.createElement("label");
        eqLabel.htmlFor = "eq" + i;
        eqLabel.innerHTML = '<img src="Images/' + shuffledPF[i][2] + '" >';
        var newDiv = document.createElement("div");
        newDiv.className = "vertCent eqCard";
        newDiv.appendChild(eqRadio);
        newDiv.appendChild(eqLabel);
        eqGrid.appendChild(newDiv);
    }

    //Shuffle again and set graphs
    shuffledPF = shuffle(pfCopy);
    for (i = 0; i < shuffledPF.length; i++) {
        //Set Graphs
        var graphRadio = document.createElement("input");
        graphRadio.type = "radio";
        graphRadio.id = "graph" + i;
        graphRadio.value = shuffledPF[i][0];
        graphRadio.name = "pfGraph";
        var graphLabel = document.createElement("label");
        graphLabel.htmlFor = "eq" + i;
        graphLabel.innerHTML = '<img src="Images/' + shuffledPF[i][3] + '" height="200" >';
        var newGraphDiv = document.createElement("div");
        newGraphDiv.className = "vertImg graphCard";
        newGraphDiv.appendChild(graphRadio);
        newGraphDiv.appendChild(graphLabel);
        graphGrid.appendChild(newGraphDiv);
    }
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
        var nameText = pfCopy[indexToEliminate][1],
            eqPic = pfCopy[indexToEliminate][2],
            graphPic = pfCopy[indexToEliminate][3];
        pfCopy.splice(indexToEliminate, 1);

        if (pfCopy.length > 0) {
            checkContainer.innerHTML =
                '<p class="correctAnswer">CORRECT!</p><p>' +
                nameText +
                '&emsp;&emsp; <img src="Images/' +
                eqPic +
                '" >&emsp;&emsp; ' +
                '<img src="Images/' +
                graphPic +
                '" height="100"></p><br />';
        } else {
            checkContainer.innerHTML =
                '<p class="correctAnswer">CORRECT!</p><p>' +
                nameText +
                '&emsp;&emsp; <img src="Images/' +
                eqPic +
                '" >&emsp;&emsp; ' +
                '<img src="Images/' +
                graphPic +
                '" height="100"></p><br /><h2>YOU CORRECTLY IDENTIFIED ALL PARENT FUNCTIONS!</h2>';
        }
    } else {
        checkContainer.innerHTML = '<p class="incorrectAnswer">Please try again.</p><br />';
    }
}

const list = document.querySelector(".list");

// We want to know the width of one of the items. We'll use this to decide how many pixels we want our carousel to scroll.
const item = document.querySelector(".item");
const itemWidth = item.offsetWidth;

function handleClick(direction) {
    // Based on the direction we call `scrollBy` with the item width we got earlier
    if (direction === "previous") {
        list.scrollBy({ left: -itemWidth, behavior: "smooth" });
    } else {
        list.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
}
