import createTdElement from "./createTdElement.js";
import openModalButton from "./modal/openModalButton.js";
import createSkuRowVisibilityButtonHandlerHandler from "./toggleSkuRowVisibility/index.js";
import calcDiscountedPrice from "./weekDaySelector/calcDiscountedPrice.js";

/**
 * @param {'enabled-skus-tbody' | 'disabled-skus-tbody'} tbodyID
 */

var createSkusTable = async (skus, tbodyID, currentDayData) => {
  var tbody = document.getElementById(tbodyID);

  for (var sku of skus) {
    let { id, skuName, price, discount, discountedPrice, clubDiscountedPrice } = sku;

    var tr = document.createElement("tr");
    tr.id = skuName;

    var skuNameTd = createTdElement(skuName, skuName, "skuName");
    var actualPriceTd = createTdElement(price, skuName, "price");
    var actualDiscountTd = createTdElement(discount, skuName, "discount");
    var actualDiscountedPriceTd = createTdElement(discountedPrice, skuName, "discountedPrice");
    var actualClubDiscountedPriceTd = createTdElement(
      clubDiscountedPrice,
      skuName,
      "clubDiscountedPrice"
    );

    var modalButton = await openModalButton(sku);
    var skuRowVisibilityButtonHandler = createSkuRowVisibilityButtonHandlerHandler(skuName, id);

    if (currentDayData) {
      var skuDataOfCurrentDay = currentDayData.find((item) => item.nmID === id);
      var expectedPriceTd = createTdElement(skuDataOfCurrentDay.price, skuName, "price-expected");
      var expectedDiscountTd = createTdElement(
        skuDataOfCurrentDay.discount,
        skuName,
        "discount-expected"
      );

      var expectedDiscountedPrice = calcDiscountedPrice(skuDataOfCurrentDay);
      var expectedDiscountedPriceTd = createTdElement(
        expectedDiscountedPrice,
        skuName,
        "discountedPrice-expected"
      );

      var expectedClubDiscountedPriceTd = createTdElement(
        expectedDiscountedPrice,
        skuName,
        "clubDiscountedPrice-expected"
      );

      if (tbodyID === "disabled-skus-tbody") {
        actualPriceTd.hidden = true;
        actualDiscountTd.hidden = true;
        actualDiscountedPriceTd.hidden = true;
        actualClubDiscountedPriceTd.hidden = true;
        expectedPriceTd.hidden = true;
        expectedDiscountTd.hidden = true;
        expectedDiscountedPriceTd.hidden = true;
        expectedClubDiscountedPriceTd.hidden = true;

        skuRowVisibilityButtonHandler.setAttribute("disbl", "");
        skuRowVisibilityButtonHandler.textContent = "включить";
        modalButton.hidden = true;
      }

      tr.append(
        skuNameTd,
        actualPriceTd,
        expectedPriceTd,
        actualDiscountTd,
        expectedDiscountTd,
        actualDiscountedPriceTd,
        expectedDiscountedPriceTd,
        actualClubDiscountedPriceTd,
        expectedClubDiscountedPriceTd,
        modalButton,
        skuRowVisibilityButtonHandler
      );

      tbody.append(tr);
      continue;
    }

    if (tbodyID === "disabled-skus-tbody") {
      actualPriceTd.hidden = true;
      actualDiscountTd.hidden = true;
      actualDiscountedPriceTd.hidden = true;
      actualClubDiscountedPriceTd.hidden = true;

      skuRowVisibilityButtonHandler.setAttribute("disbl", "");
      skuRowVisibilityButtonHandler.textContent = "включить";
      modalButton.hidden = true;
    }

    tr.append(
      skuNameTd,
      actualPriceTd,
      actualDiscountTd,
      actualDiscountedPriceTd,
      actualClubDiscountedPriceTd,
      modalButton,
      skuRowVisibilityButtonHandler
    );

    tbody.append(tr);
  }
};

export default createSkusTable;
