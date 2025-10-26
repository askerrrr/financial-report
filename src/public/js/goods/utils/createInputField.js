var createInputField = async (data, fieldName) => {
  var container = document.createElement("div");
  container.id = fieldName;
  container.className = "editable-field";

  var button = document.createElement("button");
  button.className = "editable-field-button";
  button.textContent = "Изменить";

  button.addEventListener("click", async (e) => {
    e.preventDefault();
  });

  container.append(button);
  return container;
};

export default createInputField;
