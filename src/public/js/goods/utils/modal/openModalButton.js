import createModal from "./index.js";
import createButton from "./createButton.js";

var openModalButton = async (item) => {
  var buttonHandler = {
    event: "click",
    cb: () => {
      var modalOverlay = createModal(item);

      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    },
  };

  var button = createButton("изменить", "item", item.skuName, buttonHandler);

  return button;
};

export default openModalButton;
