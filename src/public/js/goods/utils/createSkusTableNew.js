import getTime from "./getTime.js";
import createTdElement from "./createTdElement.js";
import calcDiscountedPrice from "./weekDaySelector/calcDiscountedPrice.js";
import openPriceDiscountModalButton from "./modal/openPriceDiscountModalButton.js";
import createSkuRowVisibilityButtonHandler from "./toggleSkuRowVisibility/index.js";
import createCheckboxForParticipationInPromo from "./createCheckboxForParticipationInPromo.js";

/**
 * @param {'enabled-skus-tbody' | 'disabled-skus-tbody'} tableBodyId
 */

var getCellContent = (
  skuName,
  fieldName,
  lastFetch,
  currentVal,
  expectedVal,
) => {
  var currentValSpan = document.createElement("span");
  currentValSpan.id = skuName + "-" + fieldName;
  currentValSpan.textContent = currentVal;
  currentValSpan.title = lastFetch;

  var cellContentSpan = document.createElement("span");

  if (expectedVal) {
    var expectedValSpan = document.createElement("span");
    expectedValSpan.id = skuName + "-" + fieldName + "-expected";
    expectedValSpan.textContent = expectedVal;
    expectedValSpan.title = "запланированная";

    var arrowElem = "&rarr;";
    var arrowElemSpan = document.createElement("span");
    arrowElemSpan.innerHTML = arrowElem;
    arrowElemSpan.style.margin = "0 16px";

    cellContentSpan.append(currentValSpan, arrowElemSpan, expectedValSpan);
  } else {
    cellContentSpan.append(currentValSpan);
  }

  return cellContentSpan;
};

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

    var priceText = getCellContent(skuName, "price", lastFetchTime, price);
    var discountText = getCellContent(
      skuName,
      "discount",
      lastFetchTime,
      discount,
    );
    var discountedPriceText = getCellContent(
      skuName,
      "discountedPrice",
      "",
      discountedPrice,
    );

    var clubDiscountedPriceText = getCellContent(
      skuName,
      "clubDiscountedPrice",
      lastFetchTime,
      clubDiscountedPrice,
    );

    var skuCurrentDayData = currentDayData?.find((i) => i.skuName === skuName);

    if (currentDayData && skuCurrentDayData) {
      var expectedPrice = skuCurrentDayData.data.price;
      var expectedDiscount = skuCurrentDayData.data.discount;
      var expectedDiscountedPrice = calcDiscountedPrice(skuCurrentDayData.data);

      priceText = getCellContent(
        skuName,
        "price",
        lastFetchTime,
        price,
        expectedPrice,
      );

      discountText = getCellContent(
        skuName,
        "discount",
        lastFetchTime,
        discount,
        expectedDiscount,
      );

      discountedPriceText = getCellContent(
        skuName,
        "discountedPrice",
        "",
        discountedPrice,
        expectedDiscountedPrice,
      );
    }

    var priceTd = createTdElement(priceText, skuName, "price", lastFetchTime);
    var discountTd = createTdElement(discountText, skuName, "discount");
    var discountedPriceTd = createTdElement(
      discountedPriceText,
      skuName,
      "discountedPrice",
    );
    var clubDiscountedPriceTd = createTdElement(
      clubDiscountedPriceText,
      skuName,
      "clubDiscountedPrice",
    );

    var modalButton = openPriceDiscountModalButton(sku);
    var modalButtonTdElem = createTdElement(modalButton);
    var skuRowVisibilityButtonHandler = createSkuRowVisibilityButtonHandler(
      skuName,
      id,
    );
    var skuRowVisibilityButtonHandlerTdElem = createTdElement(
      skuRowVisibilityButtonHandler,
    );

    if (tableBodyId === "disabled-skus-tbody") {
      skuRowVisibilityButtonHandler.setAttribute("disbl", "");
      skuRowVisibilityButtonHandler.textContent = "включить";
    }

    tableRow.append(
      // checkbox,
      skuNameTd,
      priceTd,
      discountTd,
      discountedPriceTd,
      clubDiscountedPriceTd,
      modalButtonTdElem,
      skuRowVisibilityButtonHandlerTdElem,
    );

    tableBody.append(tableRow);
  }
};

export default createSkusTable;
