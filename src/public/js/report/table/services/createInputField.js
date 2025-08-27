import openModal from "./openModal.js";

var createInputField = async (costPriceData) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var valueDisplay = document.createElement("span");
  valueDisplay.className = "editable-field-value";
  valueDisplay.textContent = costPriceData.costPrice;
  valueDisplay.id = `costprice-${costPriceData.skuIndex}`;

  var button = document.createElement("button");
  button.className = "editable-field-button";
  button.textContent = "Изменить";

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    await openModal(costPriceData, valueDisplay);
  });

  container.append(valueDisplay, button);
  return container;
};

export default createInputField;
