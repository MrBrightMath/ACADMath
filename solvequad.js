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
        result = [numOne, numOne.toString(), numOne, 1];
    } else {
        result = [numOne/numTwo, numOne.toString() + "/" + numTwo.toString(), numOne, numTwo];
    }
    return result; // [value, display, numerator, denominator]
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
    if (inputElement.value.includes("no")) {
        inputElement.value = inputElement.value.replace("no", "∅");
    }
}

function simplifyRadical(n) {
  let i = 2;
  let factors = {};

  // Find prime factors of n
  while (i <= n) {
    if (n % i === 0) {
      if (!factors[i]) factors[i] = 0;
      factors[i]++;
      n /= i;
    } else {
      i++;
    }
  }

  let outside = 1;
  let inside = 1;

  // Simplify radical
  for (let factor in factors) {
    let power = factors[factor];
    outside *= Math.pow(factor, Math.floor(power / 2));
    if (power % 2) inside *= factor;
  }

  var latex;
    if (outside == 1) {
        if (inside == 1) {
            latex = 1;
        } else {
            latex = String.raw`\sqrt{` + inside + "}";
        }
    } else {
        if (inside == 1) {
            latex = outside;
        } else {
            latex = outside + String.raw`\sqrt{` + inside + "}";
        }
    }
    //alert("latex: " + latex + "\nout: " + outside + "\nin: " + inside);
  return [latex, outside, inside];
}

function gcd(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

// PAGE SPECIFIC
var aValueRange = 1, solutionMethod = 1, a = 1, b = 0, c = 0, h = 0, k = 0, xSol1 = 0, xSol2 = 0, funcToDisplay = "", hint = "";

function howManyNoSolution() {
    var solCount = 0, ratCount = 0;
    for (let a = 1; a < 5; a++) {
        for (let b = -10; b < 11; b++) {
            for (let c = -10; c < 11; c++) {
                if (b*b-4*a*c == 0 || b*b-4*a*c > 0) {
                    solCount++;
                }
                if (Math.floor(Math.sqrt(b*b-4*a*c)) == Math.sqrt(b*b-4*a*c)) {
                    ratCount++;
                }
            }
        }
    }
    return [solCount/(4*21*21), ratCount/(4*21*21), (solCount-ratCount)/(4*21*21)];
}

function debug() {
    var temp = "";
    temp = temp + "a: " + a + "\n";
    temp = temp + "b: " + b + "\n";
    temp = temp + "c: " + c + "\n\n";
    temp = temp + "h: " + h + "\n";
    temp = temp + "k: " + k + "\n\n";
    temp = temp + "xSol1: " + xSol1 + "\n";
    temp = temp + "xSol2: " + xSol2 + "\n\n";
    temp = temp + "Hint: " + hint + "\n\n";
    /* temp = temp + "% with Solutions: " + howManyNoSolution()[0] + "\n";
    temp = temp + "% with Rat Sol: " + howManyNoSolution()[1] + "\n";
    temp = temp + "% with Irr Sol: " + howManyNoSolution()[2]; */
    alert(temp);
}

function nextProb() {
    // Build the problem here
    var iterations = 5, builtQuad = "", aValueRange = document.getElementById("aValueRange").value, solutionMethod = document.getElementById("solutionMethod").value;
    
    if (aValueRange == 3) {
        aValueRange = Math.floor(Math.random()*2) + 1;
    }
    if (solutionMethod == 4) {
        solutionMethod = Math.floor(Math.random()*3) + 1;
    }
    
    var problemType = 2*(Number(solutionMethod) - 1) + Number(aValueRange);
    
    switch (problemType) {
        case 1: // Factor with a = 1
            a = 1;
            var zero1 = Math.floor(Math.random()*21) - 10;
            var zero2 = Math.floor(Math.random()*21) - 10;
            if (zero1 == 0 && zero2 == 0) {
                while (zero2 == 0) {
                    zero2 = Math.floor(Math.random()*21) - 10;
                }
            }
            b = -zero1 + -zero2;
            c = -zero1 * -zero2;
            builtQuad = buildStandard(a, b, c);
            solveStandard(a, b, c);
            break;
        case 2: // Factor with a from 2 to 6
            var m1 = Math.floor(Math.random()*2) + 2;
            var b1 = Math.floor(Math.random()*21) - 10;
            if (b1 != 0) {
                while (b1 % m1 == 0) {
                    b1 = Math.floor(Math.random()*21) - 10;
                }
            }
            var m2 = Math.floor(Math.random()*3) + 1;
            var b2 = Math.floor(Math.random()*21) - 10;
            if (b1 == 0 && b2 == 0) {
                while (b2 == 0) {
                    b2 = Math.floor(Math.random()*21) - 10;
                }
            }
            if (b2 != 0 && m2 > 1) {
                while (b2 % m2 == 0) {
                    b2 = Math.floor(Math.random()*21) - 10;
                }
            }

            c = b1 * b2;
            b = m1 * b2 + m2 * b1;
            a = m1 * m2;
            builtQuad = buildStandard(a,b,c);
            solveStandard(a,b,c);
            break;
        case 3: // Inv Op with a = 1
            a = 1;
            h = Math.floor(Math.random()*21)-10;
            k = Math.floor(Math.random()*21)-10;
            for (let i = 0; i < iterations; i++) {
                if (-k/a < 0 || Math.sqrt(-k/a) != Math.floor(Math.sqrt(-k/a))) {
                    h = Math.floor(Math.random()*21)-10;
                    k = Math.floor(Math.random()*21)-10;
                } else {
                    i = iterations + 1;
                }
            }
            builtQuad = buildVertex(a,h,k);
            solveVertex(a,h,k);
            break;
        case 4: // Inv Op with a from 2 to 6
            a = Math.floor(Math.random()*5) + 2;
            h = Math.floor(Math.random()*21)-10;
            k = Math.floor(Math.random()*21)-10;
            for (let i = 0; i < iterations; i++) {
                if (-k/a < 0 || Math.sqrt(-k/a) != Math.floor(Math.sqrt(-k/a))) {
                    h = Math.floor(Math.random()*21)-10;
                    k = Math.floor(Math.random()*21)-10;
                } else {
                    i = iterations + 1;
                }
            }
            builtQuad = buildVertex(a,h,k);
            solveVertex(a,h,k);
            break;
        case 5: // Quad Formula with a = 1
            a = 1;
            b = Math.floor(Math.random()*21)-10;
            c = Math.floor(Math.random()*21)-10;
            builtQuad = buildStandard(a,b,c);
            solveStandard(a,b,c);
            break;
        case 6: // Quad Formula with a from 2 to 6
            a = Math.floor(Math.random()*5) + 2;
            b = Math.floor(Math.random()*21)-10;
            c = Math.floor(Math.random()*21)-10;
            builtQuad = buildStandard(a,b,c);
            solveStandard(a,b,c);
            break;
        default:
            a = Math.floor(Math.random()*6) + 1;
            b = Math.floor(Math.random()*21)-10;
            c = Math.floor(Math.random()*21)-10;
            h = Math.floor(Math.random()*21)-10;
            k = Math.floor(Math.random()*21)-10;
            if (Math.random() < 0.5) {
                for (let i = 0; i < iterations; i++) {
                    if (-k/a < 0 || Math.sqrt(-k/a) != Math.floor(Math.sqrt(-k/a))) {
                        h = Math.floor(Math.random()*21)-10;
                        k = Math.floor(Math.random()*21)-10;
                    } else {
                        i = iterations + 1;
                    }
                }
                builtQuad = buildVertex(a,h,k);
                solveVertex(a,h,k);
            } else {
                for (let i = 0; i < iterations; i++) {
                    if (b*b-4*a*c < 0 || Math.sqrt(b*b-4*a*c) != Math.floor(Math.sqrt(b*b-4*a*c))) {
                        b = Math.floor(Math.random()*21)-10;
                        c = Math.floor(Math.random()*21)-10;
                    } else {
                        i = iterations + 1;
                    }
                }
                builtQuad = buildStandard(a,b,c);
                solveStandard(a,b,c);
            }
    }
    
    funcToDisplay = String.raw`\(` + builtQuad + String.raw`=0\)`;
    clearResult();
    resetInputs(); // Displays function and resets inputs
}

function solveStandard(a, b, c) {
    var d = b*b-4*a*c, simpRad, gcf, reducedFrac = simplify(-b + "/" + 2*a), inFrontRoot;
    if (d < 0) {
        xSol1 = "∅";
        xSol2 = "∅";
    } else if (d == 0) {
        if (reducedFrac[3] == 1) {
            xSol1 = reducedFrac[2];
        } else {
            xSol1 = reducedFrac[2] + "/" + reducedFrac[3];            
        }
        xSol2 = "∅";
    } else if (Math.sqrt(d) == Math.floor(Math.sqrt(d))) {
        if (simplify((-b+Math.sqrt(d)) + "/" + (2*a))[3] == 1) {
            xSol1 = simplify((-b+Math.sqrt(d)) + "/" + (2*a))[2];
        } else {
            xSol1 = simplify((-b+Math.sqrt(d)) + "/" + (2*a))[2] + "/" + simplify((-b+Math.sqrt(d)) + "/" + (2*a))[3];
        }
        if (simplify((-b-Math.sqrt(d)) + "/" + (2*a))[3] == 1) {
            xSol2 = simplify((-b-Math.sqrt(d)) + "/" + (2*a))[2];
        } else {
            xSol2 = simplify((-b-Math.sqrt(d)) + "/" + (2*a))[2] + "/" + simplify((-b+Math.sqrt(d)) + "/" + (2*a))[3];
        }
    } else {
        simpRad = simplifyRadical(d);
        gcf = gcd(Math.abs(b), simpRad[1]);
        if (simpRad[1] == 1) {
            inFrontRoot = "";
        } else {
            inFrontRoot = simpRad[1];
        }
        
        if (gcf == 1) {
            xSol1 = "(" + -b + "+" + inFrontRoot + "√" + simpRad[2] + ")/" + 2*a;
            xSol2 = "(" + -b + "-" + inFrontRoot + "√" + simpRad[2] + ")/" + 2*a;
        } else {
            reducedFrac = simplify(gcf + "/" + 2*a);
            if (simpRad[1]*reducedFrac[2]/gcf == 1) {
                inFrontRoot = "";
            } else {
                inFrontRoot = simpRad[1]*reducedFrac[2]/gcf;
            }
            if (reducedFrac[3] == 1) {
                xSol1 = -b*reducedFrac[2]/gcf + "+" + inFrontRoot +  "√" + simpRad[2];
                xSol2 = -b*reducedFrac[2]/gcf + "-" + inFrontRoot +  "√" + simpRad[2];
            } else {
                xSol1 = "(" + -b*reducedFrac[2]/gcf + "+" + inFrontRoot + "√" + simpRad[2] + ")/" + reducedFrac[3];
                xSol2 = "(" + -b*reducedFrac[2]/gcf + "-" + inFrontRoot + "√" + simpRad[2] + ")/" + reducedFrac[3];
            }
        }
    }
}

function solveVertex(a, h, k) {
    var simpRadForm, ratFrac, irrFrac, inFrontRoot;
    if (-k/a < 0) {
        xSol1 = "∅";
        xSol2 = "∅";
    } else if (-k/a == 0) {
        xSol1 = h;
        xSol2 = "∅";
    } else if (Math.sqrt(-k/a) == Math.floor(Math.sqrt(-k/a))) {
        xSol1 = h + Math.sqrt(-k/a);
        xSol2 = h - Math.sqrt(-k/a);
    } else {
        if (Math.abs(a) == 1) {
            simpRadForm = simplifyRadical(Math.abs(k));
            if (simpRadForm[1] == 1) {
                inFrontRoot = "";
            } else {
                inFrontRoot = simpRadForm[1];
            }
            xSol1 = h + "+" + inFrontRoot + "√" + simpRadForm[2];
            xSol2 = h + "-" + inFrontRoot + "√" + simpRadForm[2];
        } else {
            ratFrac = simplifyRadical(Math.abs(k))[1] + "/" + simplifyRadical(Math.abs(a))[1];
            irrFrac = simplifyRadical(Math.abs(k))[2] + "/" + simplifyRadical(Math.abs(a))[2];
            ratFrac = simplify(ratFrac);
            irrFrac = simplify(irrFrac);
            let finalFrac = simplify(ratFrac[2] + "/" + ratFrac[3] * irrFrac[3]);
            if (finalFrac[2] == 1 || finalFrac[2] == -1) {
                inFrontRoot = "";
            } else {
                inFrontRoot = finalFrac[2];
            }
            if (finalFrac[3] == 1) {
                if (Math.sqrt(irrFrac[2]*irrFrac[3]) == Math.floor(Math.sqrt(irrFrac[2]*irrFrac[3]))) {
                    xSol1 = h + Math.sqrt(irrFrac[2]*irrFrac[3]);
                    xSol2 = h - Math.sqrt(irrFrac[2]*irrFrac[3]);
                } else {
                    xSol1 = h + "+" + inFrontRoot + "√" + irrFrac[2] * irrFrac[3];
                    xSol2 = h + "-" + inFrontRoot + "√" + irrFrac[2] * irrFrac[3];
                }
            } else {
                if (Math.sqrt(Number(irrFrac[2])*Number(irrFrac[3])).isInteger) {
                    let pullSol1 = simplify((finalFrac[2]*h + Math.sqrt(irrFrac[2]*irrFrac[3])) + "/" + finalFrac[3]);
                    xSol1 = pullSol1[2] + "/" + pullSol1[3];
                    let pullSol2 = simplify((finalFrac[2]*h - Math.sqrt(irrFrac[2]*irrFrac[3])) + "/" + finalFrac[3]);
                    xSol2 = pullSol2[2] + "/" + pullSol2[3];
                } else {
                    xSol1 = "(" + finalFrac[3]*h + "+" + inFrontRoot + "√" + irrFrac[2] * irrFrac[3] + ")/" + finalFrac[3];
                    xSol2 = "(" + finalFrac[3]*h + "-" + inFrontRoot + "√" + irrFrac[2] * irrFrac[3] + ")/" + finalFrac[3];                    
                }
            }
        }
    }
}

function buildVertex(a, h, k) {
    var temp = "";
    if (h == 0) {
        temp = "x^2";
    } else if (h > 0) {
        temp = "(x-" + h + ")^2";
    } else {
        temp = "(x+" + -h + ")^2";
    }
    if (a == -1) {
        temp = "-" + temp;
    } else if (a == 1) {
        temp = temp;
    } else {
        temp = a + temp;
    }
    if (k > 0) {
        temp = temp + "+" + k;
    } else if (k < 0) {
        temp = temp + k;
    }
    return temp;
}

function buildStandard(a, b, c) {
    var temp = "";
    if (a == 1) {
        temp = "x^2";
    } else if (a == -1) {
        temp = "-x^2";
    } else {
        temp = a + "x^2";
    }
    if (b > 0) {
        temp = temp + "+" + b + "x";
    } else if (b < 0) {
        temp = temp + b + "x";
    }
    if (c > 0) {
        temp = temp + "+" + c;
    } else if (c < 0) {
        temp = temp + c;
    }
    return temp;
}

function resetInputs() {
    // Display the build function and reset the inputs
    document.getElementById("problem").innerHTML = funcToDisplay;
    MathJax.typeset();

    // get inputs by ID and set .value to 0 or ""
    document.getElementById("xSol1").value = "";
    document.getElementById("xSol2").value = "";
}

function check() {
    var allCorrect = true;

    // check that inputs match the answers
    if (document.getElementById("xSol1").value != xSol1) {
        if (document.getElementById("xSol1").value != xSol2) {
            allCorrect = false;
        }
    }
    if (document.getElementById("xSol2").value != xSol2) {
        if (document.getElementById("xSol2").value != xSol1) {
            allCorrect = false;
        }
    }
    isCorrect(allCorrect);
    updateScore();
}
