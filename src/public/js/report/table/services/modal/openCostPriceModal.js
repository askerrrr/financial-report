import costPriceModal from "./costPriceModal.js";
import createButton from "./utils/createButton.js";

var openCostPriceModal = async (skuData) => {
  var container = document.createElement("div");
  container.className = "editable-field";

  var costPriceTdElement = document.createElement("span");
  costPriceTdElement.className = "editable-field-value";
  costPriceTdElement.textContent = skuData.costPrice;
  costPriceTdElement.id = `costprice-${skuData.skuIndex}`;

  var event = "click";
  var cb = async () => await costPriceModal(skuData, costPriceTdElement);
  var buttonTextContent = "Изменить";
  var openCostPriceModalButton = createButton("editable-field-button", buttonTextContent, { event, cb });

  container.append(costPriceTdElement, openCostPriceModalButton);
  return container;
};

export default openCostPriceModal;
