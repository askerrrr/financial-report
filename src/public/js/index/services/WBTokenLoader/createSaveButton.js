import sendWBAuthToken from "./sendToken.js";

var createSaveButton = (input, modal) => {
  var saveButton = document.createElement("button");
  saveButton.className = "modal-button modal-button-save";
  saveButton.textContent = "Сохранить";

  saveButton.onclick = async () => {
    if (input.value.length < 1) {
      return alert("Нельзя отправить пустое поле");
    }

    var token = input.value;
    var success = await sendWBAuthToken(token);

    if (!success) {
      input.value = "";
      alert("Некорректный токен");
      return;
    }

    modal.remove();
    setTimeout(() => alert("Токен успешно сохранен"));
  };

  return saveButton;
};

export default createSaveButton;
