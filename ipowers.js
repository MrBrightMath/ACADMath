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

function getRandInt(max) {
    var randInt = Math.floor(Math.random() * (2 * max + 1)) - max,
        display = "";
    if (randInt > 0) {
        display = "+" + randInt;
    } else if (randInt < 0) {
        display = randInt;
    } else {
        display = "";
    }
    return [randInt, display];
}

function replaceSymbols(inputElement) {
    if (inputElement.value.includes("pi")) {
        inputElement.value = inputElement.value.replace("pi", "π");
    }
    if (inputElement.value.includes("sqrt")) {
        inputElement.value = inputElement.value.replace("sqrt", "√");
    }
    if (inputElement.value.includes("deg")) {
        inputElement.value = inputElement.value.replace("deg", "°");
    }
    if (inputElement.value.includes("^2")) {
        inputElement.value = inputElement.value.replace("^2", "²");
    }
}

// PAGE SPECIFIC
var funcToDisplay = "",
    iPower = 0;

function debug() {
    var temp = "Stuff here\n";
    alert(temp);
}

function nextProb() {
    // Build the problem here
    iPower = Math.floor(Math.random() * 41);
    funcToDisplay = "Simplify " + String.raw`\(i^{` + iPower + String.raw`}\)`;

    clearResult();
    resetInputs();
}

function resetInputs() {
    // Display the build function and reset the inputs
    document.getElementById("problem").innerHTML = funcToDisplay;
    MathJax.typeset();

    // get inputs by ID and set .value to 0 or ""
    document.getElementById("answerInput").value = "";
}

function check() {
    var allCorrect = true,
        trueAnswer = "i",
        powerMod4 = iPower % 4;

    // check that inputs match the answers
    switch (powerMod4) {
        case 0:
            trueAnswer = "1";
            break;
        case 1:
            trueAnswer = "i";
            break;
        case 2:
            trueAnswer = "-1";
            break;
        case 3:
            trueAnswer = "-i";
            break;
        default:
            trueAnswer = "Oops!";
    }

    if (document.getElementById("answerInput").value == trueAnswer) {
        allCorrect = true;
    } else {
        allCorrect = false;
    }

    isCorrect(allCorrect);
    updateScore();
}

// Binomial Expansion of Complex Numbers
// Helper function to calculate binomial coefficients
function binomialCoefficient(n, k) {
     if ((typeof n !== 'number') || (typeof k !== 'number')) 
  return false; 
    var coeff = 1;
    for (var x = n-k+1; x <= n; x++) coeff *= x;
    for (x = 1; x <= k; x++) coeff /= x;
    return coeff;
}

// Function to simplify powers of i
function simplifyPowerOfI(power) {
    const mod = power % 4;
    if (mod === 0) return { real: 1, imag: 0, iPower: 0 }; // i^4k = 1
    if (mod === 1) return { real: 0, imag: 1, iPower: 1 }; // i^(4k+1) = i
    if (mod === 2) return { real: -1, imag: 0, iPower: 0 }; // i^(4k+2) = -1
    if (mod === 3) return { real: 0, imag: -1, iPower: 1 }; // i^(4k+3) = -i
}

// Function to expand and simplify (a + bi)^n and return in LaTeX + other components
function expandBinomial(real, imag, n) {
    let result = { real: 0, imag: 0 }, term = { real: 0, imag: 0 };

    // Apply binomial theorem: (a + bi)^n = Σ [C(n, k) * a^(n-k) * (bi)^k]
    for (let k = 0; k <= n; k++) {
        let binomCoeff = binomialCoefficient(n, k);

        // a^(n-k)
        let realPart = Math.pow(real, n - k);

        // (bi)^k -> Simplify powers of i for imaginary term
        var powerOfI = k % 4, isImaginary = false;
        if (powerOfI == 0) {
            imagPower = 1;
        } else if (powerOfI == 1) {
            imagPower = 1;
            isImaginary = true;
        } else if (powerOfI == 2) {
            imagPower = -1;
        } else {
            imagPower = -1;
            isImaginary = true;
        }

        // b^k
        let imagPart = Math.pow(imag, k);

        // Multiply the real term and imaginary term for each k
        if (isImaginary) {
            term.imag = binomCoeff * realPart * imagPart * imagPower;
            term.real = 0;
        } else {
            term.real = binomCoeff * realPart * imagPart * imagPower;
            term.imag = 0;
        }

        // Add the term to the result
        result.real += term.real;
        result.imag += term.imag;
    }

    // Final real part and imaginary part
    const finalReal = result.real;
    const finalImaginaryCoefficient = result.imag;

    // Format the result in LaTeX
    var latexResult = "";
    
    if (finalReal != 0) {
        latexResult = finalReal.toString();
    }

    if (finalImaginaryCoefficient == 1) {
        latexResult = latexResult + "+i";
    } else if (finalImaginaryCoefficient == -1) {
        latexResult = latexResult + "-i";
    } else if (finalImaginaryCoefficient > 0) {
        latexResult = latexResult + "+" + finalImaginaryCoefficient.toString() + "i";
    } else if (finalImaginaryCoefficient < 0) {
        latexResult = latexResult + finalImaginaryCoefficient.toString() + "i";
    }

    // Return 3 components: LaTeX string, real part, imaginary coefficient
    return {
        latex: latexResult,
        real: finalReal,
        imaginaryCoefficient: finalImaginaryCoefficient,
    };
}

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
    incorrectResponses2 = [
        "Not quite, but keep at it!",
        "I'm sorry, but give it another go!",
        "No, but don't give up!"
    ];

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

    if (numberCorrect2 == 10) {
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

function startFresh2() {
    resetScoreboard2();
    clearResult2();
    nextProb2();
}

// PAGE SPECIFIC
var funcToDisplay2 = "",
    ra = 1,
    ib = 1,
    pw = 1,
    displayB,
    currProb;

function debug2() {
    if (ib > 0) {
        ib = "+" + ib;
    }
    var temp = "(" + ra + ib + "i)^" + pw + "\n" + "Solution: " + currProb.latex + "\n" + "Real: " + currProb.real + "\nImag: " + currProb.imaginaryCoefficient;
    alert(temp);
}

function nextProb2() {
    // Build the problem here
    ra = Math.floor(Math.random() * 11) - 5;
    ib = Math.floor(Math.random() * 11) - 5;
    pw = Math.floor(Math.random() * 3) + 2;
    while (ra == 0) {
        ra = Math.floor(Math.random() * 21) - 10;
    }
    while (ib == 0) {
        ib = Math.floor(Math.random() * 21) - 10;
    }
    if (ib > 0) {
        if (ib == 1) {
            displayB = "+i)^{" + pw + "}";
        } else {
            displayB = "+" + ib + "i)^{" + pw + "}";
        }
    } else {
        if (ib == -1) {
            displayB = "-i)^{" + pw + "}";
        } else {
            displayB = ib + "i)^{" + pw + "}";
        }
    }
    funcToDisplay2 = "Simplify " + String.raw`\((` + ra + displayB + String.raw`\)`;
    clearResult2();
    resetInputs2();
}

function resetInputs2() {
    // Display the build function and reset the inputs
    document.getElementById("problem2").innerHTML = funcToDisplay2;
    MathJax.typeset();

    // get inputs by ID and set .value to 0 or ""
    document.getElementById("answerInput2").value = "";
}

function parseComplexInput(input) {
    // Remove all spaces to simplify parsing
    input = input.replace(/\s+/g, '');

    // Check if the input contains an 'i' for an imaginary part
    if (input.includes('i')) {
        // Regular expression to match patterns like "512+16209i" or "512-16209i"
        const complexRegex = /^([+-]?\d+)([+-]\d+)i$/;

        // Use the regex to match and extract parts
        const match = input.match(complexRegex);

        if (match) {
            // Extracted values from the match:
            const realPart = parseInt(match[1]); // Real number part
            const imaginaryCoefficient = parseInt(match[2]); // Imaginary coefficient

            return {
                real: realPart,
                imaginaryCoefficient: imaginaryCoefficient,
                iPower: 1 // Since there's no power, it's implicitly i^1
            };
        } else {
            throw new Error("Invalid complex number format.");
        }
    } else {
        // Handle pure real numbers (no imaginary part)
        const realNumberRegex = /^([+-]?\d+)$/;
        const match = input.match(realNumberRegex);

        if (match) {
            const realPart = parseInt(match[1]); // Real number part
            return {
                real: realPart,
                imaginaryCoefficient: 0, // No imaginary part
                iPower: 0 // No 'i' means i^0
            };
        } else {
            throw new Error("Invalid real number format.");
        }
    }
}

function check2() {
    var allCorrect2 = false;
    currProb = expandBinomial(ra, ib, pw);
    // check that inputs match the answers
    if (document.getElementById("answerInput2").value == currProb.latex) {
        allCorrect2 = true;
    }

    isCorrect2(allCorrect2);
    updateScore2();
}

// SET-UP
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
    incorrectResponses3 = [
        "Not quite, but keep at it!",
        "I'm sorry, but give it another go!",
        "No, but don't give up!"
    ];

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

    if (numberCorrect3 == 10) {
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

function startFresh3() {
    resetScoreboard3();
    clearResult3();
    nextProb3();
}

function randomSign() {
    var sign = 1;
    if (Math.random() < 0.5) {
        sign = 1;
    } else {
        sign = -1;
    }
    return sign;
}

// PAGE SPECIFIC
var funcToDisplay3 = "",
    a1 = randomSign() * Math.floor(Math.random()*10) + 1,
    b1 = randomSign() * Math.floor(Math.random()*10) + 1,
    a2 = randomSign() * Math.floor(Math.random()*10) + 1,
    b2 = randomSign() * Math.floor(Math.random()*10) + 1,
    currentProblem3 = {
        MJ: "",
        Solution: ""
    };

function debug3() {
    var temp = "";
    alert(temp);
}

function nextProb3() {
    // Build the problem here
    a1 = randomSign() * (Math.floor(Math.random()*10) + 1);
    b1 = randomSign() * (Math.floor(Math.random()*10) + 1);
    a2 = randomSign() * (Math.floor(Math.random()*10) + 1);
    b2 = randomSign() * (Math.floor(Math.random()*10) + 1);
    var b1Signed = "+" + b1 +  "i", b2Signed = "+" + b2 + "i";
    
    if (b1 < 0) {
        if (b1 == -1) {
            b1Signed = "-i";
        } else {
            b1Signed = b1 + "i";
        }
    } else {
        if (b1 == 1) {
            b1Signed = "+i";
        } else {
            b1Signed = "+" + b1 + "i";
        }
    }
    if (b2 < 0) {
        if (b2 == -1) {
            b2Signed = "-i";
        } else {
            b2Signed = b2 + "i";
        }
    } else {
        if (b2 == 1) {
            b2Signed = "+i";
        } else {
            b2Signed = "+" + b2 + "i";
        }
    }
    
    var operationType = Math.floor(Math.random()*3), realPart = 0, complexPart = 0;
    if (operationType == 0) {
        // Add
        currentProblem3.MJ = String.raw`\((` + a1 + b1Signed + String.raw`)+(` + a2 + b2Signed + String.raw`)\)`;
        realPart = a1 + a2;
        complexPart = b1 + b2;
    } else if (operationType == 1) {
        // Subtract
        currentProblem3.MJ = String.raw`\((` + a1 + b1Signed + String.raw`)-(` + a2 + b2Signed + String.raw`)\)`;
        realPart = a1 - a2;
        complexPart = b1 - b2;
    } else {
        // Multiply
        currentProblem3.MJ = String.raw`\((` + a1 + b1Signed + String.raw`)(` + a2 + b2Signed + String.raw`)\)`;
        realPart = a1 * a2 - b1 * b2;
        complexPart = a1 * b2 + a2 * b1;
    }
    
    if (realPart == 0) {
        if (complexPart == 0) {
            currentProblem3.Solution = 0;
        } else {
            if (complexPart == 1) {
                currentProblem3.Solution = "i";
            } else if (complexPart == -1) {
                currentProblem3.Solution = "-i";
            } else {
                currentProblem3.Solution = complexPart + "i";
            }
            
        }
    } else {
        if (complexPart == 0) {
            currentProblem3.Solution = realPart;
        } else {
            if (complexPart > 0) {
                if (complexPart == 1) {
                    currentProblem3.Solution = realPart.toString() + "+i";
                } else {
                    currentProblem3.Solution = realPart.toString() + "+" + complexPart + "i";
                }                
            } else {
                if (complexPart == -1) {
                    currentProblem3.Solution = realPart.toString() + "-i";
                } else {
                    currentProblem3.Solution = realPart.toString() + complexPart + "i";
                }
            }
        }
    }
    funcToDisplay3 = currentProblem3.MJ;
    clearResult3();
    resetInputs3();
}

function resetInputs3() {
    // Display the build function and reset the inputs
    document.getElementById("problem3").innerHTML = funcToDisplay3;
    MathJax.typeset();

    // get inputs by ID and set .value to 0 or ""
    document.getElementById("answerInput3").value = "";
}

function check3() {
    var allCorrect3 = true;
    // check that inputs match the answers
    if (document.getElementById("answerInput3").value != currentProblem3.Solution) {
        allCorrect3 = false;
    }

    isCorrect3(allCorrect3);
    updateScore3();
}