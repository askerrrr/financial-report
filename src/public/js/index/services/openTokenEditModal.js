import sendWBAuthToken from "./sendToken.js";

var openTokenEditModal = async () => {
  var modal = document.createElement("div");
  modal.className = "modal-overlay";

  var modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  var title = document.createElement("h3");
  title.append("Введите токен");
  title.className = "modal-title";

  var input = document.createElement("input");
  input.className = "modal-input";
  input.type = "text";

  var buttonsContainer = document.createElement("div");
  buttonsContainer.className = "modal-buttons";

  var saveButton = document.createElement("button");
  saveButton.className = "modal-button modal-button-save";
  saveButton.textContent = "Сохранить";

  saveButton.addEventListener("click", async () => {
    document.body.removeChild(modal);

    var token = input.value;

    var successSaveToken = await sendWBAuthToken(token);

    if (successSaveToken) {
      return alert("Токен успешно сохранен");
    }

    return alert("Не удалось сохранить токен");
  });

  var cancelButton = document.createElement("button");
  cancelButton.className = "modal-button modal-button-cancel";
  cancelButton.textContent = "Отмена";
  cancelButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, input, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  input.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default openTokenEditModal;
