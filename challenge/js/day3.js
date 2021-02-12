const h2 = document.querySelector("h2");
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];

const superEventHandler = {
  handleEnter: function () {
    h2.textContent = "The mouse is here!";
    h2.style.color = colors[0];
  },
  handleLeave: function () {
    h2.textContent = "The mouse is gone!";
    h2.style.color = colors[1];
  },
  handleResize: function () {
    h2.textContent = "You just resized!";
    h2.style.color = colors[2];
  },
  handleSelect: function () {
    h2.textContent = "You're selecting me!";
    h2.style.color = colors[3];
  },
  handleContext: function () {
    h2.textContent = "That was a right click!";
    h2.style.color = colors[4];
  },
};

h2.addEventListener("mouseenter", superEventHandler.handleEnter);
h2.addEventListener("mouseleave", superEventHandler.handleLeave);
window.addEventListener("resize", superEventHandler.handleResize);
window.addEventListener("contextmenu", superEventHandler.handleContext);
