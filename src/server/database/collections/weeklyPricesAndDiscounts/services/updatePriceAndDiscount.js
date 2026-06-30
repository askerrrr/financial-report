var createQuery = (sku, checkedWeekDays) => {
  var query = {};
  var arrayFilters = [];

  var count = 0;
  for (var weekDayId of checkedWeekDays) {
    for (var key of Object.keys(sku)) {
      var queryKey = `weeklyPricesAndDiscounts.${weekDayId}.$[elem${count}].${key}`;
      query[queryKey] = sku[key];
    }

    var optionKey = `elem${count}.nmID`;

    arrayFilters.push({ [optionKey]: sku.data.nmID });

    count++;
  }

  return { query, arrayFilters };
};

var updatePriceAndDiscount = async (collection, userId, sku, checkedWeekDays) => {
  var { query, arrayFilters } = createQuery(sku, checkedWeekDays);

  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters });

  return result?.acknowledged;
};

export default updatePriceAndDiscount;
