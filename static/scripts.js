let currentInput = "";
let currentCalculation = "";

const displayElement = document.getElementById("display");

function updateDisplay(){
  displayElement.value = currentInput;
}

function calculate(){
  const operators = ["+", "\u00f7", "\u00d7", "\u2212"];
  const equation = currentCalculation.split(" ");
  
  let firstNum = parseFloat(equation[0]);
  let operator = null;
  let result;
  
  //Iterate through the equation array
  for(let i = 0; i < equation.length; i++){
    if(operators.includes(equation[i])){
      operator = equation[i];
    } else {
      const secondNum = parseFloat(equation[i]);
      switch(operator) {
        case "+":
          result = firstNum + secondNum;
          break;

        case "\u2212":
          result = firstNum - secondNum;
          break;
          
        case "\u00f7":
          if(secondNum === 0){
            currentInput = "Error";
            return;
          }
          
          result = firstNum / secondNum;
          break;
          
        case "\u00d7":
          result = firstNum * secondNum;
          break;

        default:
          break;
      }
    }
  }
  
  return result;
}

const calcBtns = document.querySelectorAll(".button");

calcBtns.forEach(div => {
  div.addEventListener("click", () =>{
    const value = div.textContent;
    
    let btnFaces = div.id;
    
    if(btnFaces === "clear"){
      
      currentInput = "";
      currentCalculation = "";
      
    } else if(btnFaces === "percent"){
      
      currentInput = (parseFloat(currentInput) / 100).toString();
      currentCalculation = currentInput;
      
    }else if(btnFaces === "negative-toggle"){
      
      currentInput = (currentInput * -1).toString();
      currentCalculation = currentInput;
      
    }else if(btnFaces.includes("op")){
      
      currentInput += " " + value + " ";
      currentCalculation += " " + value + " ";
      
    }else if(btnFaces === "equal"){
      
      currentInput = calculate().toString();
      currentCalculation = "";
      
    }else{
      currentInput += value;
      currentCalculation += value;
    }
    updateDisplay();
  });
});