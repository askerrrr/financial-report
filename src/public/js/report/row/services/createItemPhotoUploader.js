var sendItemPhoto = async (itemName, imgData) => {
  var res = await fetch(`/reports/item-photo-upload/${itemName}`, {
    method: "POST",
    body: imgData,
  });

  if (!res.ok) {
    return alert("Не удалось загрузить изображение");
  }

  alert("Изображение сохранено");
};

var insertImageInImgTag = async (event, itemName) => {
  var file = event.target.files[0];

  var reader = new FileReader();

  reader.readAsDataURL(file);
  reader.addEventListener("load", (e) => {
    var span = document.getElementById("span-" + itemName);
    span.style.display = "none";

    var img = document.getElementById("img-" + itemName);
    img.style.display = "block";
    img.src = e.target.result;
  });
};

var createInputElement = async (id, itemName) => {
  var input = document.createElement("input");
  input.id = "input-" + id + "-" + itemName;
  input.name = "item-photo";
  input.type = "file";
  input.multiple = false;
  input.accept = "image/jpg, image/jpeg, image/png";
  input.style.display = "none";

  input.addEventListener("change", async (e) => {
    e.preventDefault();

    var uploadFormData = new FormData();

    uploadFormData.append("item-photo", input.files[0]);

    await insertImageInImgTag(e, itemName);

    await sendItemPhoto(itemName, uploadFormData);
  });

  return input;
};

var createLabelElement = async (id, name) => {
  var label = document.createElement("label");
  label.htmlFor = "input-" + id + "-" + name;
  label.className = "item-photo-uploader";

  return label;
};

var createFormElement = async (id, name) => {
  var form = document.createElement("form");
  form.id = id + "-" + name;
  form.enctype = "multipart/form-data";
  form.style.display = "inline";

  return form;
};

var createSpanElement = async (itemName) => {
  var span = document.createElement("span");
  span.id = "span-" + itemName;
  span.textContent = "Загрузить";
  span.style.display = "none";

  return span;
};

var createPhotoElement = async (base64, itemName) => {
  var img = document.createElement("img");
  img.id = "img-" + itemName;
  img.src = `data:image/png=;base64,${base64}`;
  img.alt = "Фото";
  img.className = "cell-photo";
  img.style.maxWidth = "100%";
  img.style.maxHeight = "80px";
  img.style.borderRadius = "4px";

  return img;
};

var createMenuButton = async () => {
  var button = document.createElement("button");
  button.className = "cell-menu-btn";
  button.innerHTML = "&hellip;";
  button.style.position = "absolute";
  button.style.top = "5px";
  button.style.right = "5px";
  button.style.background = "none";
  button.style.border = "none";
  button.style.cursor = "pointer";

  return button;
};

var createItemPhotoUploader = async (id, name, index, imgData) => {
  var input = await createInputElement(id, name);
  var span = await createSpanElement(name);
  var img = await createPhotoElement(imgData, name);
  var menuBtn = await createMenuButton();

  if (imgData) {
    img.style.display = "block";
    span.style.display = "none";
  } else {
    img.style.display = "none";
    span.style.display = "block";
  }

  var label = await createLabelElement(id, name);
  label.append(input, img, span);

  var form = await createFormElement(id, name);
  form.append(label, menuBtn);

  return form;
};

export default createItemPhotoUploader;
