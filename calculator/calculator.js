let runningTotal = 0;
let buffer = "0";
let perviousOperator;
const screen = document.querySelector(".screen");
document.querySelector(".calc-buttons") .addEventListener("click",function (event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if(buffer === "0") {
        buffer = value;
    } 
    else {
        buffer += value;
    }
}
function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            perviousOperator = null;
            break;
        case "=":
            if (perviousOperator === null)
            {
                return;
            }
            flushOperation(parseInt(buffer));
            perviousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if(buffer.length === 1)
            {
                buffer = "0";
            }
            else{
                buffer =  buffer.substring(0,buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
        }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }
    perviousOperator = value;
    buffer = "0";
}

function rerender() {
    screen.innerText = buffer;   
}

function flushOperation(intBuffer) {
    if(perviousOperator === "+") {
        runningTotal += intBuffer;
    } else if(perviousOperator === "-") {
        runningTotal -= intBuffer;
    }
    else if(perviousOperator === "×") {
        runningTotal *= intBuffer;
    }
    else {
        runningTotal /= intBuffer;
    }
}