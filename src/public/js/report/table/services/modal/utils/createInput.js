var createInput = (className, tdElement) => {
  var input = document.createElement("input");
  input.type = "text";
  input.value = tdElement.textContent;
  input.className = className;

  return input;
};

export default createInput;
