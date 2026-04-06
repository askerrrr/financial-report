var updateSingleSku = async (collection, userId, sku) => {
  var { nmID, price, discount } = sku;

  var lastUpdatedDate = new Date(Date.now() + 3 * 60 * 60 * 1000);
  var discountedPrice = price - (price * discount) / 100;

  var query = {
    ["listGoods.$[sku].price"]: price,
    ["listGoods.$[sku].discount"]: discount,
    ["listGoods.$[sku].lastUpdated"]: lastUpdatedDate,
    ["listGoods.$[sku].discountedPrice"]: discountedPrice,
    ["listGoods.$[sku].clubDiscountedPrice"]: discountedPrice,
  };

  var arrayFilters = [{ "sku.id": nmID }];

  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters });
  return result;
};

export default updateSingleSku;
