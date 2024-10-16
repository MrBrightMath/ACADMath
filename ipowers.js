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
    let result = { real: 0, imag: 0 };

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
        let term = {
            real: binomCoeff * realPart * imagPower,
            imag: binomCoeff * realPart * imagPower
        };

        // Add the term to the result
        result.real += term.real;
        result.imag += term.imag;
    }

    // Final real part and imaginary part
    const finalReal = result.real;
    const finalImaginaryCoefficient = result.imag;

    // Format the result in LaTeX
    var latexResult = finalReal;
    if (finalImaginaryCoefficient == 1) {
        latexResult = latexResult + "+i";
    } else if (finalImaginaryCoefficient == -1) {
        latexResult = latexResult + "-i";
    } else if (finalImaginaryCoefficient > 0) {
        latexResult = latexResult + "+" + finalImaginaryCoefficient + "i";
    } else if (finalImaginaryCoefficient < 0) {
        latexResult = latexResult + finalImaginaryCoefficient + "i";
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
    hasIncreased = 0;
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
    alert("expanded ok");
    // check that inputs match the answers
    try {
        const result = parseComplexInput(document.getElementById("answerInput2").value);
        if (result.real == currProb.real) {
            allCorrect2 = true;
        } else {
            allCorrect2 = false;
        }
        if (result.imaginaryCoefficient == currProb.imaginaryCoefficient) {
            allCorrect2 = true;
        } else {
            allCorrect2 = false;
        }
        var temp = "(" + ra + ib + "i)^" + pw + "\n" + "Solution: " + currProb.latex + "\n" + "Real: " + currProb.real + "\nImag: " + currProb.imaginaryCoefficient + "\nParsed Real: " + result.real + "\nParsed Imag: " + result.imaginaryCoefficient;
    alert(temp);
    } catch (error) {
        console.error(error.message);
        alert("Incorrect syntax in your answer");
    }

    isCorrect2(allCorrect2);
    updateScore2();
}
