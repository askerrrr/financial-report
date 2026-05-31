var createQuery = (skus) => {
  var query = {};
  var arrayFilters = [];

  for (var { id, skuName, metrics } of skus) {
    query[`listGoods.$[sku${id}].metrics`] = metrics;

    var arrayFilterObj = { [`sku${id}.skuName`]: skuName };
    arrayFilters.push(arrayFilterObj);
  }

  return { query, arrayFilters };
};

var updateSkusMetricsInListGoods = async (collection, userId, updatedSkus, session) => {
  var sessionOpt = session ? { session } : {};
  var { query, arrayFilters } = createQuery(updatedSkus);
  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters, ...sessionOpt });
  return result;
};

export default updateSkusMetricsInListGoods;
