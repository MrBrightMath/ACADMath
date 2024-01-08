let parentFunctions = [
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

let tableEntries = ["Col11", "Col12", "Col13", "Col14", "Col21", "Col22", "Col23", "Col24", "Col31", "Col32", "Col33", "Col34"];

let pfCopy = Array.from(parentFunctions);

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function clearDivs() {
    //var nameContainer = document.getElementById('nameDiv');
    //var eqContainer = document.getElementById('eqDiv');
    //var graphContainer = document.getElementById('graphDiv');
    var checkContainer = document.getElementById('checkDiv');
    //nameContainer.innerHTML = '';
    //eqContainer.innerHTML = '';
    //graphContainer.innerHTML = '';
    checkContainer.innerHTML = '';
    var allTableEntries = document.getElementsByTagName('td');
    for (var i = 0; i < allTableEntries.length; i++) {
        allTableEntries[i].innerHTML = '';
    }
}

function reset() {
    clearDivs();
    
    var shuffledPF = shuffle(pfCopy);
    //var nameContainer = document.getElementById('nameDiv');
    //var eqContainer = document.getElementById('eqDiv');
    //var graphContainer = document.getElementById('graphDiv');
    var eqTable = document.getElementById('eqTable');
    var nameTable = document.getElementById('nameTable');
    var graphTable = document.getElementById('graphTable');
    
    for (var i = 0; i < shuffledPF.length; i++) {
        //Set Names
        var nameRadio = document.createElement('input');
        nameRadio.type = 'radio';
        nameRadio.id = 'name' + i;
        nameRadio.value = shuffledPF[i][0];
        nameRadio.name = 'pfName';
        var nameLabel = document.createElement('label');
        nameLabel.htmlFor = 'name' + i;
        var description = document.createTextNode(shuffledPF[i][1]);
        nameLabel.appendChild(description);
        //var nameLine = document.createElement('br');
        //var nameLine2 = document.createElement('br');
        //nameContainer.appendChild(nameRadio);
        //nameContainer.appendChild(nameLabel);
        //nameContainer.appendChild(nameLine);
        //nameContainer.appendChild(nameLine2);
        var row = nameTable.getElementsByTagName('tr')[Math.floor(i/4)];
        var td = row.getElementsByTagName('td')[2*(i%4)];
        td.appendChild(nameRadio);
        td = row.getElementsByTagName('td')[2*(i%4)+1];
        td.appendChild(nameLabel);
    }
    
    shuffledPF = shuffle(pfCopy);
    for (i = 0; i < shuffledPF.length; i++) {
        //Set Equations
        var eqRadio = document.createElement('input');
        eqRadio.type = 'radio';
        eqRadio.id = 'eq' + i;
        eqRadio.value = shuffledPF[i][0];
        eqRadio.name = 'pfEQ';
        var eqLabel = document.createElement('label');
        eqLabel.htmlFor = 'eq' + i;
        eqLabel.innerHTML = '<img src="Images/' + shuffledPF[i][2] + '" >';
        //var eqLine = document.createElement('br');
        //var eqLine2 = document.createElement('br');
        //eqContainer.appendChild(eqRadio);
        //eqContainer.appendChild(eqLabel);
        //eqContainer.appendChild(eqLine);
        //eqContainer.appendChild(eqLine2);
        var row = eqTable.getElementsByTagName('tr')[Math.floor(i/4)];
        var td = row.getElementsByTagName('td')[2*(i%4)];
        td.appendChild(eqRadio);
        td = row.getElementsByTagName('td')[2*(i%4)+1];
        td.appendChild(eqLabel);
    }
    
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
        //var graphLine = document.createElement('br');
        //graphContainer.appendChild(graphRadio);
        //graphContainer.appendChild(graphLabel);
        //graphContainer.appendChild(graphLine);
        var row = graphTable.getElementsByTagName('tr')[Math.floor(i/4)];
        var td = row.getElementsByTagName('td')[2*(i%4)];
        td.appendChild(graphRadio);
        td = row.getElementsByTagName('td')[2*(i%4)+1];
        td.appendChild(graphLabel);
    }
}

function check() {
    var nameRadio = document.getElementsByName('pfName'), selectedName = 0;
    for (var i = 0; i < nameRadio.length; i++) {
        if (nameRadio[i].checked)
            selectedName = nameRadio[i].value;
    }
    
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
    
    var checkContainer = document.getElementById('checkDiv');
    
    if (selectedName == selectedEQ && selectedEQ == selectedGraph) {
        checkContainer.innerHTML = '<p class="correctAnswer">CORRECT!</p><p>' + parentFunctions[selectedName][1] + '&emsp;&emsp; <img src="Images/' + parentFunctions[selectedEQ][2] + '" >&emsp;&emsp; ' + '<img src="Images/' + parentFunctions[selectedGraph][3] + '" height="100"></p><br />';
    } else {
        checkContainer.innerHTML = '<p class="incorrectAnswer">Please try again.</p><br />';
    }
}