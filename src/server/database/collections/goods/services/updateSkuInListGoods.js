var createQuery = (skuId, data) => {
  var query = {};
  var arrayFilters = [];

  for (var key of Object.keys(data)) {
    query[`listGoods.$[sku].${key}`] = data[key];
  }

  var arrayFilterObj = { [`sku.id`]: skuId };
  arrayFilters.push(arrayFilterObj);

  return { query, arrayFilters };
};

var updateSkuInListGoods = async (collection, userId, skuId, data, session) => {
  var { query, arrayFilters } = createQuery(skuId, data);
  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters, session: session });
  return result;
};

export default updateSkuInListGoods;
