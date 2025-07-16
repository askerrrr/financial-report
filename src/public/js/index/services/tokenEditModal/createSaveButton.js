import sendWBAuthToken from "./sendToken.js";

var createSaveButton = async (input, modal) => {
  var saveButton = document.createElement("button");
  saveButton.className = "modal-button modal-button-save";
  saveButton.textContent = "Сохранить";

  saveButton.addEventListener("click", async () => {
    if (input.value.length < 1) {
      return alert("Нельзя отправить пустое поле");
    }

    document.body.removeChild(modal);

    var token = input.value;

    var successSaveToken = await sendWBAuthToken(token);

    if (successSaveToken) {
      return alert("Токен успешно сохранен");
    }

    return alert("Не удалось сохранить токен");
  });

  return saveButton;
};

export default createSaveButton;
