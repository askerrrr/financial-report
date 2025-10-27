var createInput = (id, className, type = "text", event, cb) => {
  var input = document.createElement("input");
  input.id = id;
  input.type = type;
  input.className = className;

  if (event && cb) {
    input.addEventListener(event, cb);
  }

  return { input };
};

export default createInput;
