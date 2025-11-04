var createLabel = (input, text) => {
  var label = document.createElement("label");
  label.for = input.id;
  label.textContent = text;
  label.append(input);
  return label;
};

export default createLabel;
