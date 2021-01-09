// Buffer variable is the value that I will add to the screen
let buffer = "0"
// running total variable is where I can get the total of calcultions
let runningTotal = 0
// Screen variable is the variable that connects with the output
const screen = document.querySelector(".output")
// previousOperator variable to store previous operator and keep it until I enter the next num
let previousOperator

//First thing to do is to respond to respond to button click and add function that determine what to do with the click
function init() {
    document.querySelector(".layout").addEventListener("click", function(event) {
        buttonClick(event.target.innerText)
    })
}

// then I will handle button clicks by passing to handleNum and handle symbole
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
      handleSymbol(value);
    } else {
        handleNum(value)
    }
    rerender()
  }
 
//Then I will handle num 
function handleNum(value){
    if (buffer === "0") {
        buffer = value
    }
    else {
        buffer += value
    }
}

//Then I will handle symbol
function handleSymbol(value) {
    switch(value) {
        case "=":
            if (previousOperator === null) {
                return
            }

            // I called arithOperate because at the end step of your calculations there will be the last num need to be calculated ;
            arithOperate(parseInt(buffer))
            previousOperator = null
            buffer = "" + runningTotal
            runningTotal = 0
            break;
        case "C":
            buffer = "0"
            break;
        case "←":
            if (buffer.length === 1){
                buffer = "0"
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case "+":
        case "-":
        case "×":
        case "­÷":
            handleMath(value)
            break
    }
}

//Then I will do handle math func to handle if operators are arthimetic
function handleMath(value) {
    if (buffer === "0") {
        return
        }

        if (runningTotal === 0) {
            runningTotal = parseInt(buffer)
        } else {
            arithOperate(parseInt(buffer))
        }
    previousOperator = value
    buffer = "0"
}

//Then we do our arithOperate func to do opeates
function arithOperate(intBuffer) {
    switch(previousOperator) {
        case "+":
            runningTotal += intBuffer
            break;
        case "-":
            runningTotal -= intBuffer
            break;
        case "×":
            runningTotal *= intBuffer
            break;
        case "­÷":
            runningTotal /= intBuffer
            break;
    }
}

//Then I use rerender func for showing the buffer on the output
function rerender() {
    screen.innerText = buffer
}

// note : the calculations will continue until I click C ;
init()

