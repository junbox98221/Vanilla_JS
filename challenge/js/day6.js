const select = document.querySelector("select");

function saving(country_name) {
  localStorage.setItem("country", country_name);
}
// select에서 value를 가져오는 방식에 대해 더 알아야 함
function getName() {
  const value = select.value;
  saving(value);
}

function save_selected() {
  select.addEventListener("input", getName);
}

function show_last(country_name) {
  const show = document.querySelector("option[value = start]");
  show.innerText = country_name;
}
// 난 value=start에 해당 국가를 입력했는데 쌤은 어떻게 했는지, 새로고침 이벤트는 따로 받아서 한건지 확인
function get_last_value() {
  const last_code = localStorage.getItem("country");
  if (last_code !== null) {
    const country_name = document.querySelector(`option[value = ${last_code}]`)
      .innerText;
    show_last(country_name);
  }
}

function init() {
  get_last_value();
  save_selected();
}

init();
