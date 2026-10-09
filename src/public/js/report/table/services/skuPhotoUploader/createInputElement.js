import putFileToBucket from "./putFileToBucket.js";
import getPresignedUrl from "./getPresignedUrl.js";
import insertImageToImgTag from "./insertImageToImgTag.js";

var createInputElement = (userId, skuName) => {
  var input = document.createElement("input");
  input.type = "file";
  input.name = "sku-photo";
  input.multiple = false;
  input.style.display = "none";
  input.id = "input-" + skuName;
  input.accept = "image/jpg, image/jpeg, image/png";

  input.addEventListener("change", async (e) => {
    e.preventDefault();

    var file = input.files[0];

    if (!file) {
      alert("Файл не выбран");
      return;
    }

    var { presignedUrl, errorText } = await getPresignedUrl(
      userId,
      skuName,
      file.type,
    );

    if (errorText) {
      alert(errorText);
      return;
    }

    var { success } = await putFileToBucket(presignedUrl, file);

    if (!success) {
      alert("Не удалось сохранить изображение.\nПопробуйте еще раз.");
      return;
    }

    insertImageToImgTag(e, skuName);
  });

  return input;
};

export default createInputElement;
