var createButton = (buttonText, className, id) => {
  var button = document.createElement("button");

  button.id = id;
  button.className = className;
  button.textContent = buttonText;

  return { button };
};

export default createButton;
