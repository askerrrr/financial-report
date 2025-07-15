import sendItemPhoto from "./sendItemPhoto.js";
import insertImageToImgTag from "./insertImageToImgTag.js";

var createInputElement = async (skuName) => {
  var input = document.createElement("input");
  input.id = "input-" + skuName;
  input.name = "item-photo";
  input.type = "file";
  input.multiple = false;
  input.accept = "image/jpg, image/jpeg, image/png";
  input.style.display = "none";

  input.addEventListener("change", async (e) => {
    e.preventDefault();

    var uploadFormData = new FormData();

    uploadFormData.append("item-photo", input.files[0]);

    await insertImageToImgTag(e, skuName);

    await sendItemPhoto(skuName, uploadFormData);
  });

  return input;
};

export default createInputElement;
