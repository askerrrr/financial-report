import openModal from "./openModal.js";

var createInputField = async (data, index, fieldName, url, id) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var valueDisplay = document.createElement("span");
  valueDisplay.className = "editable-field-value";
  valueDisplay.textContent = data;
  valueDisplay.id = `value-${data}`;

  var button = document.createElement("button");
  button.className = "editable-field-button";
  button.textContent = "Изменить";

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    await openModal(data, index, fieldName, valueDisplay, url, id);
  });

  container.append(valueDisplay, button);
  return container;
};

export default createInputField;
