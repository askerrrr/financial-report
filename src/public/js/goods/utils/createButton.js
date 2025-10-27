var createButton = (buttonText, className, id, event, cb) => {
  var button = document.createElement("button");

  button.id = id;
  button.className = className;
  button.textContent = buttonText;

  if (event && cb) {
    button.addEventListener(event, cb);
  }

  return { button };
};

export default createButton;
