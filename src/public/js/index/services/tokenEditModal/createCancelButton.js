var createCancelButton = async (modal) => {
  var cancelButton = document.createElement("button");
  cancelButton.className = "modal-button modal-button-cancel";
  cancelButton.textContent = "Отмена";

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  return cancelButton;
};

export default createCancelButton;
