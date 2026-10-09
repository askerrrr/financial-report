import getTime from "./getTime.js";
import createTdElement from "./createTdElement.js";
import openModalButton from "./modal/openPriceDiscountModalButton.js";
import calcDiscountedPrice from "./weekDaySelector/calcDiscountedPrice.js";
import createSkuRowVisibilityButtonHandler from "./toggleSkuRowVisibility/index.js";
import createCheckboxForParticipationInPromo from "./createCheckboxForParticipationInPromo.js";

/**
 * @param {'enabled-skus-tbody' | 'disabled-skus-tbody'} tableBodyId
 */

var createSkusTable = async (skus, tableBodyId, currentDayData) => {
  var tableBody = document.getElementById(tableBodyId);

  for (var sku of skus) {
    let { id, skuName, price, discount, discountedPrice, clubDiscountedPrice } =
      sku;

    var tableRow = document.createElement("tr");
    tableRow.id = skuName;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    var customClass = tableBodyId === "enabled-skus-tbody" ? "enbl" : "dsbl";
    checkbox.className = `${customClass} sku-checkbox`;

    var skuNameTd = createTdElement(skuName, skuName, "skuName");

    var priceTitle = "актуальная на ";
    var lastFetchTime = getTime(sku?.lastFetch, priceTitle);

    var actualPriceTd = createTdElement(price, skuName, "price", lastFetchTime);
    var actualDiscountTd = createTdElement(discount, skuName, "discount");
    var actualDiscountedPriceTd = createTdElement(
      discountedPrice,
      skuName,
      "discountedPrice",
    );
    var actualClubDiscountedPriceTd = createTdElement(
      clubDiscountedPrice,
      skuName,
      "clubDiscountedPrice",
    );

    var modalButton = await openModalButton(sku);
    var modalButtonTdElem = createTdElement(modalButton);
    var skuRowVisibilityButtonHandler = createSkuRowVisibilityButtonHandler(
      skuName,
      id,
    );
    var skuRowVisibilityButtonHandlerTdElem = createTdElement(
      skuRowVisibilityButtonHandler,
    );

    if (currentDayData) {
      var skuDataOfCurrentDay = currentDayData.find((item) => item.nmID === id);

      var expectedPriceTitle = "установлено последний раз ";
      var lastUpdatedTime = getTime(sku?.lastUpdated, expectedPriceTitle);

      var expectedPriceTd = createTdElement(
        skuDataOfCurrentDay?.data.price || "",
        skuName,
        "price-expected",
        lastUpdatedTime,
      );

      var expectedDiscountTd = createTdElement(
        skuDataOfCurrentDay?.data.discount || "",
        skuName,
        "discount-expected",
      );

      var expectedDiscountedPrice;

      if (skuDataOfCurrentDay) {
        expectedDiscountedPrice = calcDiscountedPrice(skuDataOfCurrentDay.data);
      } else {
        expectedDiscountedPrice = "";
      }

      var expectedDiscountedPriceTd = createTdElement(
        expectedDiscountedPrice,
        skuName,
        "discountedPrice-expected",
      );

      var expectedClubDiscountedPriceTd = createTdElement(
        expectedDiscountedPrice,
        skuName,
        "clubDiscountedPrice-expected",
      );

      if (tableBodyId === "disabled-skus-tbody") {
        skuRowVisibilityButtonHandler.setAttribute("disbl", "");
        skuRowVisibilityButtonHandler.textContent = "включить";
      }

      tableRow.append(
        // checkbox,
        skuNameTd,
        actualPriceTd,
        expectedPriceTd,
        actualDiscountTd,
        expectedDiscountTd,
        actualDiscountedPriceTd,
        expectedDiscountedPriceTd,
        actualClubDiscountedPriceTd,
        expectedClubDiscountedPriceTd,
        modalButtonTdElem,
        skuRowVisibilityButtonHandlerTdElem,
      );

      if (skuDataOfCurrentDay) {
        var participationInPromoCheckbox =
          createCheckboxForParticipationInPromo(
            sku,
            skuDataOfCurrentDay.changePriceIfInPromo,
          );
        var participationInPromoCheckboxTdElem = createTdElement(
          participationInPromoCheckbox,
        );
        tableRow.append(participationInPromoCheckboxTdElem);
      }

      tableBody.append(tableRow);
      continue;
    }

    if (tableBodyId === "disabled-skus-tbody") {
      skuRowVisibilityButtonHandler.setAttribute("disbl", "");
      skuRowVisibilityButtonHandler.textContent = "включить";
    }

    tableRow.append(
      // checkbox,
      skuNameTd,
      actualPriceTd,
      actualDiscountTd,
      actualDiscountedPriceTd,
      actualClubDiscountedPriceTd,
      modalButtonTdElem,
      skuRowVisibilityButtonHandlerTdElem,
    );

    tableBody.append(tableRow);
  }
};

export default createSkusTable;
