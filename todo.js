const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

let idNumbers = 1;

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    // li.id가 문자열이라서 정수로 바꾸기 위해 parseInt를 사용
    return toDo.id !== parseInt(li.id);
  });
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
  idNumbers = 1;
  cleanToDos.forEach(function (toDo) {
    toDo.id = idNumbers;
    paintToDo(toDo.text); // 내부 id도 idNum으로 지정됨.
    // paintToDo가 실행된 후 idNumbers += 1;이 실행되기 때문에 추가로 실행하지 않음.
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "Ｘ";
  // 언제 이벤트가 발생했는지에 상관없이 event가 발생함에따라 이 라인을 실행할 수 있나
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = idNumbers++;
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    console.log(parsedToDos);
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
