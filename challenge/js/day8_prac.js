const form = document.getElementById("js-form"),
  input = form.querySelector("input"),
  pending_ls = document.getElementById("js-pending"),
  finished_ls = document.getElementById("js-finished");
//pending,finished global variable
var pendingArr = [],
  finishedArr = [];

//add to array
function addToPendingArr(taskObj) {
  pendingArr.push(taskObj);
}
function addToFinishedArr(taskObj) {
  finishedArr.push(taskObj);
}
//id is for remove, move ...
function getObj(text) {
  return { id: Date.now(), text };
}

//local storage
function saveToLS() {
  localStorage.setItem("pending", JSON.stringify(pendingArr));
  localStorage.setItem("finished", JSON.stringify(finishedArr));
}
//button event
function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const id = li.id;
  removeInPending(id);
  removeInFinished(id);
  saveToLS();
}

function removeInPending(id) {
  pendingArr = pendingArr.filter(function (obj) {
    return obj.id != parseInt(id);
  });
}
function removeInFinished(id) {
  finishedArr = finishedArr.filter(function (obj) {
    return obj.id != id;
  });
}
function moveToFin(e) {
  const li = e.target.parentNode;
  deleteTask(e);
  const li_move = getObj(li.value);
  addFinishedHtml(li_move);
}
function moveToPen(e) {
  const li = e.target.parentNode;
  deleteTask(e);
  const li_move = getObj(li.value);
  addPendingHtml(li_move);
}
//create li
//li same part in  pending, finished
function sameLiPart(taskObj) {
  const li = document.createElement("li");
  // set li.id to find li for remove it when need
  li.id = taskObj.id;
  li.innerText = taskObj.text;
  deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  li.append(deleteBtn);
  deleteBtn.addEventListener("click", deleteTask);
  return li;
}

function addPendingHtml(taskObj) {
  const li = sameLiPart(taskObj);
  checkBtn = document.createElement("button");
  checkBtn.innerText = "✅";
  checkBtn.addEventListener("click", moveToFin);
  li.append(checkBtn);
  pending_ls.append(li);
  addToPendingArr(taskObj);
  saveToLS();
}
function addFinishedHtml(taskObj) {
  const li = sameLiPart(taskObj);
  checkBtn = document.createElement("button");
  checkBtn.innerText = "⏪";
  checkBtn.addEventListener("click", moveToPen);
  li.append(checkBtn);
  finished_ls.append(li);
  addToFinishedArr(taskObj);
  saveToLS();
}

function handleFormSubmit(e) {
  //prevent submit event
  e.preventDefault();
  const task = input.value;
  const taskObj = getObj(task);
  addPendingHtml(taskObj);
}
//when local storage is empty, return []
function pendingJsonErrorHandler(pendingLS) {
  return JSON.parse(pendingLS) || [];
}
function finishedJsonErrorHandler(finishedLS) {
  return JSON.parse(finishedLS) || [];
}
//
function loadPending() {
  const pending_from_LS = pendingJsonErrorHandler(
    localStorage.getItem("pending")
  );
  pending_from_LS.forEach(function (element) {
    addPendingHtml(element);
  });
}
function loadFinished() {
  const finished_from_LS = finishedJsonErrorHandler(
    localStorage.getItem("finished")
  );
  finished_from_LS.forEach(function (element) {
    addFinishedHtml(element);
  });
}

function init() {
  form.addEventListener("submit", handleFormSubmit);
  loadPending();
  loadFinished();
}

init();
