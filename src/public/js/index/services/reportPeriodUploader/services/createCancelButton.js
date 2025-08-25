var createCancelButton = async () => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-cancel";
  button.textContent = "Отмена";

  return button;
};

export default createCancelButton;
