var createInputField = async (id, placeholder) => {
  var input = document.createElement("input");
  input.id = id;
  input.type = "text";
  input.placeholder = placeholder;
  input.className = "modal-input";

  return input;
};

export default createInputField;
