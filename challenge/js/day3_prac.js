const h2 = document.querySelector("h2");
const html = document.querySelector("body");
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];

const superEventHandler = {
  mouseOn: function () {
    h2.innerText = "The mouse is here!";
    h2.style.color = colors[0];
  },
  mouseOut: function () {
    h2.innerText = "The mouse is gone!";
    h2.style.color = colors[1];
  },
  resize: function () {
    h2.innerText = "You just resized!";
    h2.style.color = colors[2];
  },
  right: function () {
    h2.innerText = "That was a right click!";
    h2.style.color = colors[3];
  },
};

h2.addEventListener("mouseenter", superEventHandler.mouseOn);
h2.addEventListener("mouseout", superEventHandler.mouseOut);
window.addEventListener("resize", superEventHandler.resize);
window.addEventListener("contextmenu", superEventHandler.right);
