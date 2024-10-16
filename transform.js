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

function startFresh() {
    resetScoreboard();
    clearResult();
    nextProb();
}

// HELPER FUNCTIONS
function simplify(str) {
    var result = "",
        data = str.split("/"),
        numOne = Number(data[0]),
        numTwo = Number(data[1]);
    for (var i = Math.max(numOne, numTwo); i > 1; i--) {
        if (numOne % i == 0 && numTwo % i == 0) {
            numOne /= i;
            numTwo /= i;
        }
    }
    if (numTwo === 1) {
        result = numOne.toString();
    } else {
        result = numOne.toString() + "/" + numTwo.toString();
    }
    return result;
}

function getRandFrac() {
    var num = Math.floor(Math.random() * 9) - 4;
    while (num == 0) {
        num = Math.floor(Math.random() * 9) - 4;
    }

    var denoms = [1, 1, 1, 1, 1, 2, 3, 4],
        den = denoms[Math.floor(Math.random() * denoms.length)],
        frac = simplify(num + "/" + den),
        data = frac.split("/"),
        sign = "";

    if (num < 0) {
        sign = "-";
    }

    var value = num / den,
        displayFrac = "";

    if (value == Math.floor(value)) {
        if (value == 1) {
            displayFrac = "";
        } else if (value == -1) {
            displayFrac = "-";
        } else {
            displayFrac = value;
        }
    } else {
        displayFrac = sign + String.raw`\frac{` + Math.abs(data[0]) + "}{" + data[1] + "}";
    }

    return [value, displayFrac, num, den];
}

function getHorK(hork, max) {
    var randInt = Math.floor(Math.random() * (2 * max + 1)) - max,
        display = "";
    if (hork == "h") {
        if (randInt < 0) {
            display = "+" + -randInt;
        } else if (randInt > 0) {
            display = "-" + randInt;
        } else {
            display = "";
        }
    } else if (hork == "k") {
        if (randInt < 0) {
            display = randInt;
        } else if (randInt > 0) {
            display = "+" + randInt;
        } else {
            display = "";
        }
    }
    return [randInt, display];
}

function toggleInputs(useTrig, useB) {
    if (useTrig) {
        document.getElementById("horizShiftInput").style.display = "none";
        document.getElementById("vertShiftInput").style.display = "none";
        document.getElementById("horizCompInput").style.display = "none";
        document.getElementById("vertCompInput").style.display = "none";
        document.getElementById("amp").style.display = "inline";
        document.getElementById("mid").style.display = "inline";
        document.getElementById("phase").style.display = "inline";
        document.getElementById("freq").style.display = "inline";
    } else {
        document.getElementById("horizShiftInput").style.display = "inline";
        document.getElementById("vertShiftInput").style.display = "inline";
        document.getElementById("horizCompInput").style.display = "inline";
        document.getElementById("vertCompInput").style.display = "inline";
        document.getElementById("amp").style.display = "none";
        document.getElementById("mid").style.display = "none";
        document.getElementById("phase").style.display = "none";
        document.getElementById("freq").style.display = "none";
    }
    if (!useB) {
        document.getElementById("freq").style.display = "none";
        document.getElementById("horizCompInput").style.display = "none";
    }
}

function whiteInputs() {
    document.getElementById("horizShiftDir").style.backgroundColor = "white";
        document.getElementById("horizShiftVal").style.backgroundColor = "white";
        document.getElementById("vertShiftDir").style.backgroundColor = "white";
        document.getElementById("vertShiftVal").style.backgroundColor = "white";
        document.getElementById("horizCompDir").style.backgroundColor = "white";
        document.getElementById("horizCompVal").style.backgroundColor = "white";
        document.getElementById("horizRef").style.backgroundColor = "white";
        document.getElementById("vertCompDir").style.backgroundColor = "white";
        document.getElementById("vertCompVal").style.backgroundColor = "white";
        document.getElementById("vertRef").style.backgroundColor = "white";
        document.getElementById("sineHorizShiftDir").style.backgroundColor = "white";
        document.getElementById("sineHorizShiftVal").style.backgroundColor = "white";
        document.getElementById("sineVertShiftDir").style.backgroundColor = "white";
        document.getElementById("sineVertShiftVal").style.backgroundColor = "white";
        document.getElementById("sineHorizCompDir").style.backgroundColor = "white";
        document.getElementById("sineHorizCompVal").style.backgroundColor = "white";
        document.getElementById("sineHorizRef").style.backgroundColor = "white";
        document.getElementById("sineVertCompDir").style.backgroundColor = "white";
        document.getElementById("sineVertCompVal").style.backgroundColor = "white";
        document.getElementById("sineVertRef").style.backgroundColor = "white";
        
}

// TRANSFORMATION SPECIFIC
var funcType = 1,
    horComp = 1,
    a = 0,
    b = 0,
    h = 0,
    k = 0,
    bh = 0,
    displayA = "",
    displayB = "",
    displayH = "",
    displayK = "",
    displayBH = "",
    hsd = 0,
    vsd = 0,
    hcd = 0,
    vcd = 0,
    hr = 1,
    vr = 1,
    funcToDisplay = String.raw`\(f(x)=`,
    useB = true;

function setOtherValues() {
    if (Math.abs(a) > 1) {
        vcd = 1;
    } else if (Math.abs(a) < 1) {
        vcd = -1;
    } else {
        vcd = 0;
    }
    if (a > 0) {
        vr = 0;
    } else {
        vr = 1;
    }

    if (Math.abs(b) > 1) {
        hcd = 1;
    } else if (Math.abs(b) < 1) {
        hcd = -1;
    } else {
        hcd = 0;
    }
    if (b > 0) {
        hr = 0;
    } else {
        hr = 1;
    }

    if (h > 0) {
        hsd = 1;
    } else if (h < 0) {
        hsd = -1;
    } else {
        hsd = 0;
    }

    if (k > 0) {
        vsd = 1;
    } else if (k < 0) {
        vsd = -1;
    } else {
        vsd = 0;
    }
}

function debug() {
    var temp = "a: " + a + "\n";
    temp = temp + "displayA: " + displayA + "\n";
    temp = temp + "b: " + b + "\n";
    temp = temp + "displayB: " + displayB + "\n";
    temp = temp + "h: " + h + "\n";
    temp = temp + "displayH: " + displayH + "\n";
    temp = temp + "k: " + k + "\n";
    temp = temp + "displayK: " + displayK + "\n";
    temp = temp + "bh: " + bh + "\n";
    temp = temp + "displayBH: " + displayBH + "\n";
    temp = temp + "hsd: " + hsd + "\n";
    temp = temp + "vsd: " + vsd + "\n";
    temp = temp + "hcd: " + hcd + "\n";
    temp = temp + "vcd: " + vcd + "\n";
    temp = temp + "hr: " + hr + "\n";
    temp = temp + "vr: " + vr + "\n";
    temp = temp + "funcType: " + funcType + "\n";
    temp = temp + "horComp: " + horComp + "\n";
    alert(temp);
}

function nextProb() {
    var randFuncType = 0,
        randHorComp = 0,
        aArray = getRandFrac(),
        bArray = getRandFrac(),
        hArray = getHorK("h", 10),
        kArray = getHorK("k", 10),
        whichFunction = 0;
    
    whiteInputs();

    funcType = document.getElementById("funcType").value;
    if (funcType == 6) {
        funcType = Math.floor(Math.random() * 5) + 1;
    }
    horComp = document.getElementById("horComp").value;
    if (horComp == 4) {
        horComp = Math.floor(Math.random() * 3) + 1;
    }
    whichFunction = 3 * (Number(funcType) - 1) + Number(horComp) - 1;

    a = aArray[0];
    b = bArray[0];
    h = hArray[0];
    k = kArray[0];
    displayA = aArray[1];
    displayB = bArray[1];
    displayH = hArray[1];
    displayK = kArray[1];
    if (b == 1) {
        bh = h;
    } else {
        bh = (bArray[2] * hArray[0]) / bArray[3];
    }

    var data = simplify(Math.abs(bArray[2]) * Math.abs(hArray[0]) + "/" + bArray[3]).split("/");
    if (bh == Math.floor(bh)) {
        if (bh > 0) {
            displayBH = "-" + bh;
        } else if (bh < 0) {
            displayBH = "+" + -bh;
        } else {
            displayBH = "";
        }
    } else {
        if (bh > 0) {
            displayBH = String.raw`-\frac{` + data[0] + "}{" + data[1] + "}";
        } else if (bh < 0) {
            displayBH = String.raw`+\frac{` + data[0] + "}{" + data[1] + "}";
        } else {
            displayBH = "";
        }
    }
    setOtherValues();
    funcToDisplay = "";

    switch (whichFunction) {
        case 0:
            buildQuadNoB();
            break;
        case 1:
            buildQuadStandB();
            break;
        case 2:
            buildQuadGCFB();
            break;
        case 3:
            buildABSNoB();
            break;
        case 4:
            buildABSStandB();
            break;
        case 5:
            buildABSGCFB();
            break;
        case 6:
            buildRadNoB();
            break;
        case 7:
            buildRadStandB();
            break;
        case 8:
            buildRadGCFB();
            break;
        case 9:
            buildExpNoB();
            break;
        case 10:
            buildExpStandB();
            break;
        case 11:
            buildExpGCFB();
            break;
        case 12:
            buildSineNoB();
            break;
        case 13:
            buildSineStandB();
            break;
        case 14:
            buildSineGCFB();
            break;
        default:
            buildQuadNoB();
    }

    clearResult();
    resetInputs();
}

function resetInputs() {
    // Display the build function and reset the inputs
    document.getElementById("problem").innerHTML = funcToDisplay;
    MathJax.typeset();

    document.getElementById("horizShiftDir").value = 0;
    document.getElementById("horizShiftVal").value = "";
    document.getElementById("vertShiftDir").value = 0;
    document.getElementById("vertShiftVal").value = "";
    document.getElementById("horizCompDir").value = 0;
    document.getElementById("horizCompVal").value = "";
    document.getElementById("horizRef").value = 0;
    document.getElementById("vertCompDir").value = 0;
    document.getElementById("vertCompVal").value = "";
    document.getElementById("vertRef").value = 0;
}

function buildSineNoB() {
    if (displayA == "-") {
        displayA = "-1" + String.raw`\cdot `;
    } else if (displayA != "") {
        displayA = displayA + String.raw`\cdot `;
    }
    if (h == 0) {
        funcToDisplay = String.raw`\f(x)=` + displayA + "sin(x)" + displayK + String.raw`\)`;
    } else {
        funcToDisplay = String.raw`\(f(x)=` + displayA + "sin(x" + displayH + ")" + displayK + String.raw`\)`;
    }
    toggleInputs(true, false);
}

function buildExpNoB() {
    if (displayA == "-") {
        displayA = "-1" + String.raw`\cdot `;
    } else if (displayA != "") {
        displayA = displayA + String.raw`\cdot `;
    }
    if (h == 0) {
        funcToDisplay = String.raw`\f(x)=` + displayA + "2^x" + displayK + String.raw`\)`;
    } else {
        funcToDisplay = String.raw`\(f(x)=` + displayA + "2^{x" + displayH + "}" + displayK + String.raw`\)`;
    }
    toggleInputs(false, false);
}

function buildRadNoB() {
    if (h == 0) {
        funcToDisplay = String.raw`\f(x)=` + displayA + String.raw`\sqrt{x}` + displayK + String.raw`\)`;
    } else {
        funcToDisplay =
            String.raw`\(f(x)=` + displayA + String.raw`\sqrt{x` + displayH + "}" + displayK + String.raw`\)`;
    }
    toggleInputs(false, false);
}

function buildABSNoB() {
    if (h == 0) {
        funcToDisplay = String.raw`\f(x)=` + displayA + "|x|" + displayK + String.raw`\)`;
    } else {
        funcToDisplay = String.raw`\(f(x)=` + displayA + "|x" + displayH + "|" + displayK + String.raw`\)`;
    }
    toggleInputs(false, false);
}

function buildQuadNoB() {
    if (h == 0) {
        funcToDisplay = String.raw`\(f(x)=` + displayA + "x^2" + displayK + String.raw`\)`;
    } else {
        funcToDisplay = String.raw`\(f(x)=` + displayA + "(x" + displayH + ")^2" + displayK + String.raw`\)`;
    }
    toggleInputs(false, false);
}

function buildSineStandB() {
    if (displayA == "-") {
        displayA = "-1" + String.raw`\cdot `;
    } else if (displayA != "") {
        displayA = displayA + String.raw`\cdot `;
    }
    var tempDisplay = "";
    if (h == 0) {
        if (b == 1) {
            tempDisplay = "sin(x)";
        } else {
            tempDisplay = "sin(" + displayB + "x)";
        }
    } else {
        if (b == 1) {
            tempDisplay = "sin(x" + displayH + ")";
        } else {
            tempDisplay = "sin(" + displayB + "x" + displayBH + ")";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(true, true);
}

function buildExpStandB() {
    if (displayA == "-") {
        displayA = "-1" + String.raw`\cdot `;
    } else if (displayA != "") {
        displayA = displayA + String.raw`\cdot `;
    }
    var tempDisplay = "";
    if (h == 0) {
        if (b == 1) {
            tempDisplay = "2^x";
        } else {
            tempDisplay = "2^{" + displayB + "x}";
        }
    } else {
        if (b == 1) {
            tempDisplay = "2^{x" + displayH + "}";
        } else {
            tempDisplay = "2^{" + displayB + "x" + displayBH + "}";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(false, true);
}

function buildRadStandB() {
    var tempDisplay = "";
    if (h == 0) {
        if (b == 1) {
            tempDisplay = String.raw`\sqrt{x}`;
        } else {
            tempDisplay = String.raw`\sqrt{` + displayB + "x}";
        }
    } else {
        if (b == 1) {
            tempDisplay = String.raw`\sqrt{x` + displayH + "}";
        } else {
            tempDisplay = String.raw`\sqrt{` + displayB + "x" + displayBH + "}";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(false, true);
}

function buildABSStandB() {
    var tempDisplay = "";
    if (h == 0) {
        if (b == 1) {
            tempDisplay = "|x|";
        } else {
            tempDisplay = "|" + displayB + "x|";
        }
    } else {
        if (b == 1) {
            tempDisplay = "|x" + displayH + "|";
        } else {
            tempDisplay = "|" + displayB + "x" + displayBH + "|";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(false, true);
}

function buildQuadStandB() {
    var tempDisplay = "";
    if (h == 0) {
        if (b == 1) {
            tempDisplay = "x^2";
        } else {
            tempDisplay = "(" + displayB + "x)^2";
        }
    } else {
        if (b == 1) {
            tempDisplay = "(x" + displayH + ")^2";
        } else {
            tempDisplay = "(" + displayB + "x" + displayBH + ")^2";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(false, true);
}

function buildSineGCFB() {
    if (displayA == "-") {
        displayA = "-1" + String.raw`\cdot `;
    } else if (displayA != "") {
        displayA = displayA + String.raw`\cdot `;
    }
    var tempDisplay = "";
    if (h != 0) {
        if (b == 1) {
            tempDisplay = "sin(x" + displayH + ")";
        } else {
            tempDisplay = "sin(" + displayB + "(x" + displayH + "))";
        }
    } else {
        if (b == 1) {
            tempDisplay = "sin(x)";
        } else {
            tempDisplay = "sin(" + displayB + "x)";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(true, true);
}

function buildExpGCFB() {
    if (displayA == "-") {
        displayA = "-1" + String.raw`\cdot `;
    } else if (displayA != "") {
        displayA = displayA + String.raw`\cdot `;
    }
    var tempDisplay = "";
    if (h != 0) {
        if (b == 1) {
            tempDisplay = "2^{x" + displayH + "}";
        } else {
            tempDisplay = "2^{" + displayB + "(x" + displayH + ")}";
        }
    } else {
        if (b == 1) {
            tempDisplay = "2^x";
        } else {
            tempDisplay = "2^{" + displayB + "x}";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(false, true);
}

function buildRadGCFB() {
    var tempDisplay = "";
    if (h != 0) {
        if (b == 1) {
            tempDisplay = String.raw`\sqrt{x` + displayH + "}";
        } else {
            tempDisplay = String.raw`\sqrt{` + displayB + "(x" + displayH + ")}";
        }
    } else {
        if (b == 1) {
            tempDisplay = String.raw`\sqrt{x}`;
        } else {
            tempDisplay = String.raw`\sqrt{` + displayB + "x" + "}";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(false, true);
}

function buildABSGCFB() {
    var tempDisplay = "";
    if (h != 0) {
        if (b == 1) {
            tempDisplay = "|x" + displayH + "|";
        } else {
            tempDisplay = "|" + displayB + "(x" + displayH + ")|";
        }
    } else {
        if (b == 1) {
            tempDisplay = "|x|";
        } else {
            tempDisplay = "|" + displayB + "x" + "|";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(false, true);
}

function buildQuadGCFB() {
    var tempDisplay = "";
    if (h != 0) {
        if (b == 1) {
            tempDisplay = "(x" + displayH + ")^2";
        } else {
            tempDisplay = "(" + displayB + "(x" + displayH + "))^2";
        }
    } else {
        if (b == 1) {
            tempDisplay = "x^2";
        } else {
            tempDisplay = "(" + displayB + "x" + ")^2";
        }
    }
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
    toggleInputs(false, true);
}

function check() {
    var allCorrect = true,
        inputs = [
            ["horizShiftDir", hsd],
            ["horizShiftVal", Math.abs(h)],
            ["vertShiftDir", vsd],
            ["vertShiftVal", Math.abs(k)],
            ["vertCompDir", vcd],
            ["vertCompVal", Math.abs(a)],
            ["vertRef", vr],
            ["horizCompDir", hcd],
            ["horizCompVal", Math.abs(b)],
            ["horizRef", hr]
        ],
        sineInputs = [
            ["sineHorizShiftDir", hsd],
            ["sineHorizShiftVal", Math.abs(h)],
            ["sineVertShiftDir", vsd],
            ["sineVertShiftVal", Math.abs(k)],
            ["sineVertCompDir", vcd],
            ["sineVertCompVal", Math.abs(a)],
            ["sineVertRef", vr],
            ["sineHorizCompDir", hcd],
            ["sineHorizCompVal", Math.abs(b)],
            ["sineHorizRef", hr]
        ],
        arrayToTest = [],
        lengthToTest = 0;
    
    if (funcType == 5) {
        arrayToTest = sineInputs;
    } else {
        arrayToTest = inputs;
    }
    
    if (horComp == 1) {
        lengthToTest = arrayToTest.length - 3;
    } else {
        lengthToTest = arrayToTest.length;
    }

    for (let i = 0; i < lengthToTest; i++) {
        var valToTest;
        if (document.getElementById(arrayToTest[i][0]).value.includes("/")) {
            var data = document.getElementById(arrayToTest[i][0]).value.split("/"),
                numOne = data[0],
                numTwo = data[1];
            valToTest = numOne / numTwo;
        } else {
            valToTest = document.getElementById(arrayToTest[i][0]).value;
        }
        if (valToTest != arrayToTest[i][1]) {
            allCorrect = false;
            document.getElementById(arrayToTest[i][0]).style.backgroundColor = "lightcoral";
        } else {
            document.getElementById(arrayToTest[i][0]).style.backgroundColor = "lightgreen";
        }
    }

    /*if (document.getElementById("horizShiftDir").value != hsd) {
        allCorrect = false;
        document.getElementById("horizShiftDir").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("horizShiftDir").style.backgroundColor = "lightgreen";
    }

    if (Math.abs(document.getElementById("horizShiftVal").value) != Math.abs(h)) {
        allCorrect = false;
        document.getElementById("horizShiftVal").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("horizShiftVal").style.backgroundColor = "lightgreen";
    }

    if (document.getElementById("vertShiftDir").value != vsd) {
        allCorrect = false;
        document.getElementById("vertShiftDir").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("vertShiftDir").style.backgroundColor = "lightgreen";
    }

    if (Math.abs(document.getElementById("vertShiftVal").value) != Math.abs(k)) {
        allCorrect = false;
        document.getElementById("vertShiftVal").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("vertShiftVal").style.backgroundColor = "lightgreen";
    }

    if (useB) {
        if (document.getElementById("horizCompDir").value != hcd) {
            allCorrect = false;
            document.getElementById("horizCompDir").style.backgroundColor = "lightcoral";
        } else {
            document.getElementById("horizCompDir").style.backgroundColor = "lightgreen";
        }

        if (document.getElementById("horizCompVal").value.includes("/")) {
            var dataB = document.getElementById("horizCompVal").value.split("/"),
                numOneB = dataB[0],
                numTwoB = dataB[1],
                checkB = numOneB / numTwoB;
            if (Math.abs(checkB) != Math.abs(b)) {
                allCorrect = false;
                document.getElementById("horizCompVal").style.backgroundColor = "lightcoral";
            } else {
                document.getElementById("horizCompVal").style.backgroundColor = "lightgreen";
            }
        } else {
            if (Math.abs(document.getElementById("horizCompVal").value) != Math.abs(b)) {
                allCorrect = false;
                document.getElementById("horizCompVal").style.backgroundColor = "lightcoral";
            } else {
                document.getElementById("horizCompVal").style.backgroundColor = "lightgreen";
            }
        }
        if (document.getElementById("horizRef").value != hr) {
            allCorrect = false;
            document.getElementById("horizRef").style.backgroundColor = "lightcoral";
        } else {
            document.getElementById("horizRef").style.backgroundColor = "lightgreen";
        }
    }

    if (document.getElementById("vertCompDir").value != vcd) {
        allCorrect = false;
        document.getElementById("vertCompDir").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("vertCompDir").style.backgroundColor = "lightgreen";
    }

    if (document.getElementById("vertCompVal").value.includes("/")) {
        var dataA = document.getElementById("vertCompVal").value.split("/"),
            numOneA = dataA[0],
            numTwoA = dataA[1],
            checkA = numOneA / numTwoA;
        if (Math.abs(checkA) != Math.abs(a)) {
            allCorrect = false;
            document.getElementById("vertCompVal").style.backgroundColor = "lightcoral";
        } else {
            document.getElementById("vertCompVal").style.backgroundColor = "lightgreen";
        }
    } else {
        if (Math.abs(document.getElementById("vertCompVal").value) != Math.abs(a)) {
            allCorrect = false;
            document.getElementById("vertCompVal").style.backgroundColor = "lightcoral";
        } else {
            document.getElementById("vertCompVal").style.backgroundColor = "lightgreen";
        }
    }

    if (document.getElementById("vertRef").value != vr) {
        allCorrect = false;
        document.getElementById("vertRef").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("vertRef").style.backgroundColor = "lightgreen";
    }
    */

    if (allCorrect) {
        isCorrect(true);
    } else {
        isCorrect(false);
    }

    updateScore();
}
