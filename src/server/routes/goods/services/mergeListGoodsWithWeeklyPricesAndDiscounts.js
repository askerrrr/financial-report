var mergeListGoodsWithWeeklyPricesAndDiscounts = (listGoods, weeklyPricesAndDiscounts) => {
  var mergedData = [];
  var activeSkus = listGoods.filter((sku) => !sku.deleted && !sku.disabled);

  for (var { id, skuName, price, discount } of activeSkus) {
    var weeklyPrices = [];
    var weeklyDiscounts = [];

    for (var day of weeklyPricesAndDiscounts) {
      var skuPriceAndDinsount = day.find((item) => item.nmID === id)?.data;

      if (!skuPriceAndDinsount) {
        weeklyPrices.push(price);
        weeklyDiscounts.push(discount);
      } else {
        weeklyPrices.push(skuPriceAndDinsount.price);
        weeklyDiscounts.push(skuPriceAndDinsount.discount);
      }
    }

    mergedData.push({ id, skuName, weeklyPrices, weeklyDiscounts });
  }

  return { mergedData };
};

export default mergeListGoodsWithWeeklyPricesAndDiscounts;
