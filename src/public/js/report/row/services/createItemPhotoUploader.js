var createInputElement = async (id, name) => {
  var input = document.createElement("input");
  input.id = id;
  input.name = name;
  input.type = "file";
  input.multiple = false;
  input.accept = ".jpg, .jpeg, .png";
  input.style.display = "none";

  return input;
};

var createLabelElement = async (id) => {
  var label = document.createElement("label");
  label.htmlFor = id;
  label.className = "item-photo-uploader";

  return label;
};

var createFormElement = async (id) => {
  var form = document.createElement("form");
  form.id = id;
  form.enctype = "multifpath/form-data";
  form.style.display = "inline";

  return form;
};

var createSpanElement = async () => {
  var span = document.createElement("span");
  span.textContent = "Загрузить фото";
  span.style.display = "none";

  return span;
};

var createItemPhotoUploader = async (id, name) => {
  var input = await createInputElement(id, name);
  var span = await createSpanElement();

  var label = await createLabelElement(id);
  label.append(input, span);

  var form = await createFormElement(id);
  form.append(label);

  return form;
};

export default createItemPhotoUploader;
