import createTdElement from "./createTdElement.js";
import openModalButton from "./modal/openModalButton.js";
import disableSkuButtonHandler from "./disableSku/index.js";
import hideUnnecessaryElements from "./disableSku/hideUnnecessaryElements.js";

/**
 * @param {'enabled-skus-tbody' | 'disabled-skus-tbody'} tbodyID
 */

var createSkusTable = async (skus, tbodyID) => {
  var tbody = document.getElementById(tbodyID);

  for (var sku of skus) {
    let { id, skuName, price, discount, discountedPrice, clubDiscountedPrice } = sku;

    var tr = document.createElement("tr");
    tr.id = skuName;

    var skuNameTd = createTdElement(skuName, skuName, "skuName");
    var priceTd = createTdElement(price, skuName, "price");
    var discountTd = createTdElement(discount, skuName, "discount");
    var discountedPriceTd = createTdElement(discountedPrice, skuName, "discountedPrice");
    var clubDiscountedPriceTd = createTdElement(
      clubDiscountedPrice,
      skuName,
      "clubDiscountedPrice"
    );

    var modalButton = await openModalButton(sku);
    var disableButton = disableSkuButtonHandler(skuName, id);

    if (tbodyID === "disabled-skus-tbody") {
      modalButton.hidden = true;
      priceTd.hidden = true;
      discountTd.hidden = true;
      discountedPriceTd.hidden = true;
      clubDiscountedPriceTd.hidden = true;
      disableButton.setAttribute("disbl", "");
      disableButton.textContent = "включить";
    }

    tr.append(
      skuNameTd,
      priceTd,
      discountTd,
      discountedPriceTd,
      clubDiscountedPriceTd,
      modalButton,
      disableButton
    );

    tbody.append(tr);
  }
};

export default createSkusTable;
