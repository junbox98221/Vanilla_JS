const generatedNum = document.querySelector(".generated_num"),
  input = document.getElementById("js-range"),
  form = document.getElementById("js-guess"),
  result = document.querySelector("div#js-result"),
  span = result.querySelector("span");

let selectedNum, guessedNum;
function chooseNumRange() {
  selectedNum = parseInt(input.value);
  generatedNum.innerText = selectedNum;
}

function guessNum(e) {
  e.preventDefault();
  const inputInForm = form.querySelector("input");
  guessedNum = parseInt(inputInForm.value);
}

function playGame(e) {
  guessNum(e);

  const ranNum = Math.ceil(Math.random() * selectedNum);
  console.log(ranNum, guessedNum);
  if (ranNum == guessedNum) {
    span.innerText = "You Win!";
  } else {
    span.innerText = "You Lost!";
  }
}

function init() {
  input.addEventListener("input", chooseNumRange);
  form.addEventListener("submit", playGame);
}

init();
