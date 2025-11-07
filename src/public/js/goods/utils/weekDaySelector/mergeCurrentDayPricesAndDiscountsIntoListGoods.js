import calcDiscountedPrice from "./calcDiscountedPrice.js";

var mergeCurrentDayPricesAndDiscountsIntoListGoods = (enabledSku, currentDayPricesAndDiscouns) => {
  for (var sku of enabledSku) {
    var skuDayData = currentDayPricesAndDiscouns.find((item) => item.nmID === sku.id);

    if (skuDayData) {
      sku.price = skuDayData.price;
      sku.discount = skuDayData.discount;
      sku.discountedPrice = calcDiscountedPrice(sku);
      sku.clubDiscountedPrice = sku.discountedPrice;
    }
  }

  return { updatedSkus: enabledSku };
};

export default mergeCurrentDayPricesAndDiscountsIntoListGoods;
