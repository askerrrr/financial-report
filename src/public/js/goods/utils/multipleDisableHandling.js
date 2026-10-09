var multipleDisableHandling = (tbodyID) => {
  var mainTableCheckboxId =
    tbodyID === "enabled-skus-tbody"
      ? "enabled-skus-checkbox"
      : "disabled-skus-checkbox";

  var mainTableCheckbox = document.getElementById(mainTableCheckboxId);

  var nestedCheckboxesSelector =
    tbodyID === "enabled-skus-tbody"
      ? "input[class~=enbl]"
      : "input[class~=dsbl]";

  var nestedCheckboxes = document.querySelectorAll(nestedCheckboxesSelector);

  mainTableCheckbox.addEventListener("change", () => {
    mainTableCheckbox.checked
      ? nestedCheckboxes.forEach((item) => (item.checked = true))
      : nestedCheckboxes.forEach((item) => (item.checked = false));
  });
};

export default multipleDisableHandling;
