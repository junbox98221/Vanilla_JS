const body = document.querySelector("body");

const color_purple1 = "color_purple";
const color_yellow = "color_yellow ";
const color_blue = "color_blue";

function color() {
  if (window.innerWidth <= 500) {
    body.className = color_purple1;
  } else if (500 < window.innerWidth && window.innerWidth <= 1000) {
    body.className = color_yellow;
  } else body.className = color_blue;
}

function init() {
  window.addEventListener("resize", color);
}
init();
