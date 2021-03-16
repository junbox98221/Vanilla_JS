const select = document.querySelector("select");

function forLs(value) {
  return { country: value };
}

function selectHandler() {
  const inputValue = select.value;
  localStorage.setItem("country", JSON.stringify(inputValue));
}

function get_last_value() {
  var inputValue;
  if ((inputValue = JSON.parse(localStorage.getItem("country")))) {
    select.value = inputValue;
  }
}

get_last_value();
select.addEventListener("change", selectHandler);
