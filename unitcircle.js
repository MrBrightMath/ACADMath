function clearUC() {
    var currentInput;
    for (i = 1; i < 67; i++) {
        currentInput = document.getElementById("uc"+i);
        currentInput.value = "";
        currentInput.style.backgroundColor = "white";
    }
    focusedInput = document.getElementById("uc1");
    focusedInput.focus();
}

var focusedInput = document.getElementById("uc1");

function checkUC() {
    var currentInput;
    for (i = 1; i < 67; i++) {
        currentInput = document.getElementById("uc"+i);
        if (currentInput.value == currentInput.dataset.solution) {
            currentInput.style.backgroundColor = "lightgreen";
        } else {
            currentInput.style.backgroundColor = "lightcoral";
        }
    }
    focusedInput = document.getElementById("uc1");
    focusedInput.focus();
}

function setFocus() {
    focusedInput = document.activeElement;
}

function addRoot() {
    focusedInput.value += "√";
    focusedInput.focus();
}

function addPi() {
    focusedInput.value += "π";
    focusedInput.focus();
}

function addDegree() {
    focusedInput.value += "°";
    focusedInput.focus();
}