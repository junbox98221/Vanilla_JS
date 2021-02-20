const body = document.querySelector("body"),
  num_button = document.querySelectorAll("js-number"),
  result = document.querySelector(".result");

let num1_save = null,
  num2_save = null,
  oper_save = null,
  numEvent = false,
  operEvent = false,
  calResult = null;

function calculator(operator) {
  if (oper_save == "+") {
    num1_save = num1_save + num2_save;
  } else if (oper_save == "-") {
    num1_save = num1_save - num2_save;
  } else if (oper_save == "/") {
    num1_save = num1_save / num2_save;
  } else if (oper_save == "*") {
    num1_save = num1_save * num2_save;
  } else if (oper_save == "=") {
    result.innerText = num1_save;
    num2_save = null;
    return;
  }
  result.innerText = num1_save;
  oper_save = operator;
  num2_save = null;
}
// num 버튼을 2번 클릭하는 경우 숫자가 중첩되게 나오는 것까지 완료
function numClick(e) {
  const num = parseInt(e.target.innerText);
  console.log(num1_save, num2_save, numEvent, operEvent);
  if (numEvent == false && operEvent == false) {
    console.log(1);
    num1_save = num;
    result.innerText = num1_save;
  } else if (numEvent == true && operEvent == false) {
    console.log(2);
    if (oper_save != null) {
      num2_save = num2_save * 10 + num;
      result.innerText = num2_save;
    } else {
      num1_save = num1_save * 10 + num;
      result.innerText = num1_save;
    }
  } else if (numEvent == false && operEvent == true) {
    if (num1_save != null) {
      console.log("5");
      num2_save = num;
      result.innerText = num2_save;
    }
  }
  numEvent = true;
  operEvent = false;
}

function operClick(e) {
  const operator = e.target.innerText;
  console.log(num1_save, num2_save, numEvent, operEvent);

  if (numEvent == true && operEvent == false && num2_save != null) {
    console.log("aaaa");
    calculator(oper_save);
    operEvent = false;
    numEvent = true;
    oper_save = operator;
    return;
  }
  oper_save = operator;
  operEvent = true;
  numEvent = false;
}

function cClick() {
  num1_save = null;
  num2_save = null;
  oper_save = null;
  numEvent = false;
  operEvent = false;
  calResult = null;
  result.innerText = 0;
}

function click(e) {
  if (
    e.target.className === "js-number" ||
    e.target.className === "js-number zero"
  ) {
    numClick(e);
  } else if (
    e.target.className === "js-operation operation" ||
    e.target.className == "js-equals"
  ) {
    operClick(e);
  } else if (e.target.className === "js-reset reset") {
    cClick(e);
  }
}

function init() {
  body.addEventListener("click", click);
}

init();
