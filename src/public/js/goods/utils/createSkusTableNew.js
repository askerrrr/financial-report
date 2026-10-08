import getTime from "./getTime.js";
import createTdElement from "./createTdElement.js";
import openModalButton from "./modal/openModalButton.js";
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

    var priceText = price;
    var discountText = discount;
    var discountedPriceText = discountedPrice;
    var clubDiscountedPriceText = clubDiscountedPrice;

    var skuCurrentDayData = currentDayData?.find(
      (item) => item.skuName === skuName,
    );

    if (currentDayData && skuCurrentDayData) {
      var expectedPrice = skuCurrentDayData.data.price;
      var expectedDiscount = skuCurrentDayData.data.discount;
      var expectedDiscountedPrice = skuCurrentDayData.data.discountedPrice;
      var expectedClubDiscountedPrice =
        skuCurrentDayData.data.clubDiscountedPrice;

      priceText += " --> " + expectedPrice;
      discountText += " --> " + expectedDiscount;
      discountedPriceText += " --> " + expectedDiscountedPrice;
      clubDiscountedPriceText += " --> " + expectedClubDiscountedPrice;
    }

    console.log({ priceText, discountText });
    var priceTitle = "актуальная на ";
    var lastFetchTime = getTime(sku?.lastFetch, priceTitle);

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

    var modalButton = await openModalButton(sku);
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
