var createSaveButton = async () => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Сохранить";

  return button;
};

export default createSaveButton;
