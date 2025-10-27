import createButton from "./createButton.js";

var createInputField = async (data, fieldName) => {
  var container = document.createElement("div");
  container.id = fieldName;
  container.className = "editable-field";

  var { button } = createButton("Изменить", "edit-price-discount-button");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
  });

  container.append(button);
  return container;
};

export default createInputField;
