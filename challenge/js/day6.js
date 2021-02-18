const select = document.querySelector("select");

// select에서 value를 가져오는 방식에 대해 더 알아야 함
function getName() {
  const value = select.value;
  localStorage.setItem("country", value);
}

// 난 value=start에 해당 국가를 입력했는데 쌤은 어떻게 했는지, 새로고침 이벤트는 따로 받아서 한건지 확인
function get_last_value() {
  const last_code = localStorage.getItem("country");
  if (last_code) {
    const country_name = document.querySelector(`option[value = ${last_code}]`);
    country_name.selected = true;
  }
}

get_last_value();
select.addEventListener("change", getName);
