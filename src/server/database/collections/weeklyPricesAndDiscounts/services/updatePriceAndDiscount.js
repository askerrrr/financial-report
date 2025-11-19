var createQueryAndOptions = (sku, checkedWeekDays) => {
  var query = {};
  var arrayFilters = [];

  var count = 0;
  for (var weekDayId of checkedWeekDays) {
    var queryKey = `weeklyPricesAndDiscounts.${weekDayId}.$[elem${count}]`;
    query[queryKey] = sku;

    var optionKey = `elem${count}.nmID`;

    arrayFilters.push({ [optionKey]: sku.nmID });

    count++;
  }

  return { query, arrayFilters };
};

var updatePriceAndDiscount = async (collection, userId, sku, checkedWeekDays) => {
  var { query, arrayFilters } = createQueryAndOptions(sku, checkedWeekDays);

  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters });

  return result?.acknowledged;
};

module.exports = updatePriceAndDiscount;
