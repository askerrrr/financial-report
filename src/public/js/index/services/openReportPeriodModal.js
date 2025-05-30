var openReportPeriodModal = async () => {
  var modal = document.createElement("div");
  modal.className = "modal-overlay";

  var modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  var title = document.createElement("h3");
  title.append("Введите период отчета");
  title.className = "modal-title";

  var dateFromInput = document.createElement("input");
  dateFromInput.id = "dateFromInput";
  dateFromInput.className = "modal-input";
  dateFromInput.type = "text";
  dateFromInput.placeholder = "начало в формате гг.мм.дд - 2025.04.20";

  var dateToInput = document.createElement("input");
  dateToInput.id = "dateToInput";
  dateToInput.className = "modal-input";
  dateToInput.type = "text";
  dateToInput.placeholder = "конец в формате гг.мм.дд - 2025.04.27";

  var buttonsContainer = document.createElement("div");
  buttonsContainer.className = "modal-buttons";

  var saveButton = document.createElement("button");
  saveButton.className = "modal-button modal-button-save";
  saveButton.textContent = "Сохранить";

  saveButton.addEventListener("click", async () => {
    document.body.removeChild(modal);

    var dateFrom = dateFromInput.value;
    var dateTo = dateToInput.value;

    console.log(dateFrom, dateTo);
    var successSaveToken = await sendWBAuthToken(token);

    console.log(successSaveToken);
  });

  var cancelButton = document.createElement("button");
  cancelButton.className = "modal-button modal-button-cancel";
  cancelButton.textContent = "Отмена";
  cancelButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, dateFromInput, dateToInput, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  dateFromInput.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default openReportPeriodModal;
