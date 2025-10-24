var createInputField = async (data, fieldName) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var valueDisplay = document.createElement("span");
  valueDisplay.className = "editable-field-value";
  valueDisplay.textContent = data;
  valueDisplay.id = `${fieldName}-${data}`;

  var button = document.createElement("button");
  button.className = "editable-field-button";
  button.textContent = "Изменить";

  button.onclick = async () => {
    //
  };

  container.append(valueDisplay, button);
  return container;
};

export default createInputField;
