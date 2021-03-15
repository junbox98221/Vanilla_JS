const form = document.getElementById("js-form"),
  input = form.querySelector("input"),
  pendingUl = document.getElementById("js-pending"),
  finishedUl = document.getElementById("js-finished");

let pendingTasks = [],
  finishedTasks = [];

function getObj(text) {
  return { id: Date.now(), text };
}
// LS에 저장하는 함수
function saveToLS() {
  localStorage.setItem("pending", JSON.stringify(pendingTasks));
  localStorage.setItem("finished", JSON.stringify(finishedTasks));
}
// LS에 저장될 때 사용되는 전역변수를 update하는 함수
function putPendingTasks(taskObj) {
  pendingTasks.push(taskObj);
}

function putFinishedTasks(taskObj) {
  finishedTasks.push(taskObj);
}

function deleteTask(e) {
  const li = e.target.parentNode;
  console.log(li);
  li.parentNode.removeChild(li);
  const id = li.id;
  removeInPending(id);
  removeInFinished(id);
  saveToLS();
}

function sameLiPart(taskObj) {
  const li = document.createElement("li");
  li.innerText = taskObj.text;
  deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  li.append(deleteBtn);
  deleteBtn.addEventListener("click", deleteTask);
  return li;
}

function findInPending(id) {
  return pendingTasks.find(function (obj) {
    return obj.id == id;
  });
}
function findInFinished(id) {
  return finishedTasks.find(function (obj) {
    return obj.id == id;
  });
}

function removeInPending(id) {
  pendingTasks = pendingTasks.filter(function (obj) {
    return obj.id != id;
  });
}
function removeInFinished(id) {
  finishedTasks = finishedTasks.filter(function (obj) {
    return obj.id != id;
  });
}

function moveToFin(e) {
  const li = e.target.parentNode;
  const id = li.id;
  const obj = findInPending(id);
  removeInPending(id);
  addfinishedHtml(obj);
  deleteTask(e);
  saveToLS();
}

function moveToPen(e) {
  const li = e.target.parentNode;
  const id = li.id;
  const obj = findInFinished(id);
  removeInFinished(id);
  addPendingHtml(obj);
  deleteTask(e);
  saveToLS();
}

function addfinishedHtml(taskObj) {
  li = sameLiPart(taskObj);
  li.id = taskObj.id;
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "⏪";
  // 여기서 전역변수에 해당 taskObj를 넣기 2줄 아래에 moveToFin에서 사용되서
  putFinishedTasks(taskObj);
  checkBtn.addEventListener("click", moveToPen);
  li.append(checkBtn);
  finishedUl.append(li);
}

function addPendingHtml(taskObj) {
  li = sameLiPart(taskObj);
  li.id = taskObj.id;
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✅";
  // 여기서 전역변수에 해당 taskObj를 넣기 2줄 아래에 moveToFin에서 사용되서
  putPendingTasks(taskObj);
  checkBtn.addEventListener("click", moveToFin);
  li.append(checkBtn);
  pendingUl.append(li);
}

//
function handleFormSubmit(e) {
  e.preventDefault();
  taskObj = getObj(input.value);
  input.value = "";
  addPendingHtml(taskObj);

  saveToLS();
}

function pendingJsonErrorHandler(pendingLS) {
  return JSON.parse(pendingLS) || [];
}

function finishedJsonErrorHandler(finishedLS) {
  return JSON.parse(finishedLS) || [];
}

function loadPending() {
  pending_from_LS = pendingJsonErrorHandler(localStorage.getItem("pending"));
  pending_from_LS.forEach(function (element) {
    addPendingHtml(element);
  });
}

function loadFinished() {
  finished_from_LS = finishedJsonErrorHandler(localStorage.getItem("finished"));
  finished_from_LS.forEach(function (element) {
    addfinishedHtml(element);
    console.log(element);
  });
}

function init() {
  form.addEventListener("submit", handleFormSubmit);
  loadPending();
  loadFinished();
}

init();
