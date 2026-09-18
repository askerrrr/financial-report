import createUploadTokenBtn from "./createUploadTokenBtn.js";
import createTitle from "../index/utils/modalWindowUtils/createTitle.js";
import createModal from "../index/utils/modalWindowUtils/createModal.js";
import createInputField from "../index/utils/modalWindowUtils/createInputField.js";
import closeModalButton from "../index/utils/modalWindowUtils/createCancelButton.js";
import createButtonsContainer from "../index/utils/modalWindowUtils/createButtonsContainer.js";

var categoriesByType = {
  prices: ["Цены и скидки"],
  reports: ["Финансы", "Аналитика", "Продвижение"],
};

var createTokenLoaderModal = (userId) => {
  var modal = createModal("modal-overlay");
  modal.id = "token-modal";
  modal.classList.add("active");

  var input = createInputField("token", "Вставьте токен");
  input.type = "text";
  input.classList.add("modal-input");

  var title = createTitle("Введите токен");
  title.classList.add("modal-title");

  var radioBlock = document.createElement("div");
  radioBlock.className = "modal-radios";

  var reportsRadio = createRadio("token-type", "reports", "получение отчётов");
  var pricesRadio = createRadio("token-type", "prices", "установка цен");

  radioBlock.append(reportsRadio.label, pricesRadio.label);

  var categoriesTitle = document.createElement("div");
  categoriesTitle.className = "modal-categories-title";
  categoriesTitle.textContent = "необходимые категории";

  var categoriesList = document.createElement("ul");
  categoriesList.className = "modal-categories-list";
  categoriesList.id = "modal-categories-list";

  reportsRadio.input.addEventListener("change", () => {
    if (reportsRadio.input.checked) updateCategories("reports");
  });

  pricesRadio.input.addEventListener("change", () => {
    if (pricesRadio.input.checked) updateCategories("prices");
  });

  reportsRadio.input.checked = true;
  updateCategories("reports");

  var saveButton = createUploadTokenBtn(userId, input, modal);
  var cancelButton = closeModalButton(modal);

  var buttonsContainer = createButtonsContainer(cancelButton, saveButton);
  buttonsContainer.append(cancelButton, saveButton);

  var modalContent = createModal("modal-content");

  modalContent.append(
    title,
    radioBlock,
    categoriesTitle,
    categoriesList,
    input,
    buttonsContainer,
  );

  modal.append(modalContent);
  document.body.append(modal);

  input.focus();

  return modal;

  function updateCategories(type) {
    categoriesList.innerHTML = "";

    var items = categoriesByType[type] || [];

    items.forEach((text) => {
      var li = document.createElement("li");
      li.textContent = text;
      categoriesList.append(li);
    });
  }
};

export default createTokenLoaderModal;

function createRadio(name, value, text) {
  var label = document.createElement("label");
  label.className = "modal-radio";

  var input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;

  var span = document.createElement("span");
  span.textContent = text;

  label.append(input, span);

  return { label, input };
}
