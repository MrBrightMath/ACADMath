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
    var num = Math.floor(Math.random() * 9)-4;
    while (num == 0) {
        num = Math.floor(Math.random() * 9) - 4;
    }
    
    var denoms = [1, 1, 1, 1, 1, 2, 3, 4], den = denoms[Math.floor(Math.random() * denoms.length)], frac = simplify(num + "/" + den), data=frac.split("/"), sign="";
    
    if (num < 0) {
        sign = "-";
    }
    
    var value = num/den, displayFrac = "";
    
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

    return([value, displayFrac, num, den]);
}

function getHorK(hork, max) {
    var randInt = Math.floor(Math.random() * (2 * max + 1)) - max, display="";
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
    alert(temp);
}

function nextProb() {
    var randFuncType = 0,
        randHorComp = 0,
        aArray = getRandFrac(),
        bArray = getRandFrac(),
        hArray = getHorK("h", 10),
        kArray = getHorK("k", 10);
        
    funcType = document.getElementById("funcType").value;
    horComp = document.getElementById("horComp").value;
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
        bh = bArray[2] * hArray[0] / bArray[3];
    }
    
    var data = simplify((Math.abs(bArray[2])*Math.abs(hArray[0])) + "/" + bArray[3]).split("/");
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

    switch (funcType) {
        case "1": // Quadratic
            switch (horComp) {
                case "1": // No B Value
                    useB = false;
                    buildQuadNoB();
                    break;
                case "2": // Standard bx-bh
                    useB = true;
                    buildQuadStandB();
                    break;
                case "3": // GCF b(x-h)
                    useB = true;
                    buildQuadGCFB();
                    break;
                case "4": // Random
                    randHorComp = Math.floor(Math.random() * 3 + 1).toString();
                    switch (randHorComp) {
                        case "1": // No B Value
                            useB = false;
                            buildQuadNoB();
                            break;
                        case "2": // Standard bx-bh
                            useB = true;
                            buildQuadStandB();
                            break;
                        case "3": // GCF b(x-h)
                            useB = true;
                            buildQuadGCFB();
                            break;
                        default: // Default to No B
                            useB = false;
                            buildQuadNoB();
                    }
                    break;
                default: // Default to No B
                    useB = false;
                    buildQuadNoB();
            }
            break;
        default: // Default to Quadratic
            useB = false;
            buildQuadNoB();
    }

    clearResult();
    resetInputs();
}

function resetInputs() {
    // Display the build function and reset the inputs
    document.getElementById("problem").innerHTML = funcToDisplay;
    MathJax.typeset();

    document.getElementById("quadHorizShiftDir").value = 0;
    document.getElementById("quadHorizShiftVal").value = "";
    document.getElementById("quadVertShiftDir").value = 0;
    document.getElementById("quadVertShiftVal").value = "";
    document.getElementById("quadHorizCompDir").value = 0;
    document.getElementById("quadHorizCompVal").value = "";
    document.getElementById("quadHorizRef").value = 0;
    document.getElementById("quadVertCompDir").value = 0;
    document.getElementById("quadVertCompVal").value = "";
    document.getElementById("quadVertRef").value = 0;
}

function buildQuadNoB() {
    if (h == 0) {
        funcToDisplay = String.raw`\(f(x)=` + displayA + "x^2" + displayK + String.raw`\)`;
    } else {
        funcToDisplay = String.raw`\(f(x)=` + displayA + "(x" + displayH + ")^2" + displayK + String.raw`\)`;
    }
    document.getElementById("horCompInput").style.visibility = "hidden";
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
            tempDisplay = "(x" + displayBH + ")^2";
        } else {
            tempDisplay = "(" + displayB + "x" + displayBH + ")^2";
        }
    }
    document.getElementById("horCompInput").style.visibility = "visible";
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
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
    document.getElementById("horCompInput").style.visibility = "visible";
    funcToDisplay = String.raw`\(f(x)=` + displayA + tempDisplay + displayK + String.raw`\)`;
}

function check() {
    var allCorrect = true;
    if (document.getElementById("quadHorizShiftDir").value != hsd) {
        allCorrect = false;
        document.getElementById("quadHorizShiftDir").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("quadHorizShiftDir").style.backgroundColor = "lightgreen";
    }

    if (Math.abs(document.getElementById("quadHorizShiftVal").value) != Math.abs(h)) {
        allCorrect = false;
        document.getElementById("quadHorizShiftVal").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("quadHorizShiftVal").style.backgroundColor = "lightgreen";
    }

    if (document.getElementById("quadVertShiftDir").value != vsd) {
        allCorrect = false;
        document.getElementById("quadVertShiftDir").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("quadVertShiftDir").style.backgroundColor = "lightgreen";
    }

    if (Math.abs(document.getElementById("quadVertShiftVal").value) != Math.abs(k)) {
        allCorrect = false;
        document.getElementById("quadVertShiftVal").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("quadVertShiftVal").style.backgroundColor = "lightgreen";
    }

    if (useB) {
        if (document.getElementById("quadHorizCompDir").value != hcd) {
            allCorrect = false;
            document.getElementById("quadHorizCompDir").style.backgroundColor = "lightcoral";
        } else {
            document.getElementById("quadHorizCompDir").style.backgroundColor = "lightgreen";
        }

        if (document.getElementById("quadHorizCompVal").value.includes("/")) {
            var dataB = document.getElementById("quadHorizCompVal").value.split("/"),
                numOneB = dataB[0],
                numTwoB = dataB[1],
                checkB = numOneB / numTwoB;
            if (Math.abs(checkB) != Math.abs(b)) {
                allCorrect = false;
                document.getElementById("quadHorizCompVal").style.backgroundColor = "lightcoral";
            } else {
                document.getElementById("quadHorizCompVal").style.backgroundColor = "lightgreen";
            }
        } else {
            if (Math.abs(document.getElementById("quadHorizCompVal").value) != Math.abs(b)) {
                allCorrect = false;
                document.getElementById("quadHorizCompVal").style.backgroundColor = "lightcoral";
            } else {
                document.getElementById("quadHorizCompVal").style.backgroundColor = "lightgreen";
            }
        }
        if (document.getElementById("quadHorizRef").value != hr) {
            allCorrect = false;
            document.getElementById("quadHorizRef").style.backgroundColor = "lightcoral";
        } else {
            document.getElementById("quadHorizRef").style.backgroundColor = "lightgreen";
        }
    }
    
    if (document.getElementById("quadVertCompDir").value != vcd) {
        allCorrect = false;
        document.getElementById("quadVertCompDir").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("quadVertCompDir").style.backgroundColor = "lightgreen";
    }

    if (document.getElementById("quadVertCompVal").value.includes("/")) {
        var dataA = document.getElementById("quadVertCompVal").value.split("/"),
            numOneA = dataA[0],
            numTwoA = dataA[1],
            checkA = numOneA / numTwoA;
        if (Math.abs(checkA) != Math.abs(a)) {
            allCorrect = false;
            document.getElementById("quadVertCompVal").style.backgroundColor = "lightcoral";
        } else {
            document.getElementById("quadVertCompVal").style.backgroundColor = "lightgreen";
        }
    } else {
        if (Math.abs(document.getElementById("quadVertCompVal").value) != Math.abs(a)) {
            allCorrect = false;
            document.getElementById("quadVertCompVal").style.backgroundColor = "lightcoral";
        } else {
            document.getElementById("quadVertCompVal").style.backgroundColor = "lightgreen";
        }
    }

    if (document.getElementById("quadVertRef").value != vr) {
        allCorrect = false;
        document.getElementById("quadVertRef").style.backgroundColor = "lightcoral";
    } else {
        document.getElementById("quadVertRef").style.backgroundColor = "lightgreen";
    }

    if (allCorrect) {
        document.getElementById("quadHorizShiftDir").style.backgroundColor = "white";
        document.getElementById("quadHorizShiftVal").style.backgroundColor = "white";
        document.getElementById("quadVertShiftDir").style.backgroundColor = "white";
        document.getElementById("quadVertShiftVal").style.backgroundColor = "white";
        document.getElementById("quadHorizCompDir").style.backgroundColor = "white";
        document.getElementById("quadHorizCompVal").style.backgroundColor = "white";
        document.getElementById("quadHorizRef").style.backgroundColor = "white";
        document.getElementById("quadVertCompDir").style.backgroundColor = "white";
        document.getElementById("quadVertCompVal").style.backgroundColor = "white";
        document.getElementById("quadVertRef").style.backgroundColor = "white";
        isCorrect(true);
    } else {
        isCorrect(false);
    }
    
    updateScore();
}
