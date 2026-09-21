var disablesSkusTable = document.getElementById("disabled-skus-table");
var toggleDisabledSkusButton = document.getElementById("toggle-disabled-skus");

var handleDisabledSkusToggle = () => {
  toggleDisabledSkusButton.addEventListener("click", () => {
    if (disablesSkusTable.hidden === true) {
      disablesSkusTable.hidden = false;
      toggleDisabledSkusButton.textContent = "Убрать скрытие товары";
    } else {
      disablesSkusTable.hidden = true;
      toggleDisabledSkusButton.textContent = "Показать скрытые товары";
    }
  });
};

export default handleDisabledSkusToggle;
