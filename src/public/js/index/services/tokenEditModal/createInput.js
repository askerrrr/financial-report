var createInput = async () => {
  var input = document.createElement("input");
  input.id = "token";
  input.type = "text";
  input.className = "modal-input";

  return input;
};

export default createInput;
