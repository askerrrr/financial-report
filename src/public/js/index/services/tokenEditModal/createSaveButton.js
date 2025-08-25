import sendWBAuthToken from "./sendToken.js";
import checkToken from "../../../decodeReportWithoutAuth/checkToken.js";

var createSaveButton = async (input, modal) => {
  var saveButton = document.createElement("button");
  saveButton.className = "modal-button modal-button-save";
  saveButton.textContent = "Сохранить";

  saveButton.onclick = async () => {
    if (input.value.length < 1) {
      return alert("Нельзя отправить пустое поле");
    }

    var token = input.value;

    var { validToken } = await checkToken(token);

    var success = await sendWBAuthToken(validToken);

    if (!success) {
      input.value = "";
      return;
    }

    modal.remove();

    setTimeout(() => alert("Токен успешно сохранен"));
  };

  return saveButton;
};

export default createSaveButton;
