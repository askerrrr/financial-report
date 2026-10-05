var createLabel = (text, input) => {
  var label = document.createElement("label");
  label.htmlFor = input.id;
  label.className = "modal-checkbox-label";
  label.append(input, text);

  return label;
};

export default createLabel;
