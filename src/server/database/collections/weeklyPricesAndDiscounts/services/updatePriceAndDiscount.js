var createQueryAndOptions = (nmID, price, discount, checkedWeekDays) => {
  var query = {};
  var arrayFilters = [];

  var count = 0;
  for (var weekDayId of checkedWeekDays) {
    var queryKey = `weeklyPricesAndDiscounts.${weekDayId}.$[elem${count}]`;
    var queryValue = { nmID, price, discount };
    query[queryKey] = queryValue;

    var optionKey = `elem${count}.nmID`;

    arrayFilters.push({ [optionKey]: nmID });

    count++;
  }

  return { query, arrayFilters };
};

var updatePriceAndDiscount = async (collection, userId, nmID, price, discount, checkedWeekDays) => {
  var { query, arrayFilters } = createQueryAndOptions(nmID, price, discount, checkedWeekDays);

  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters });

  return result?.acknowledged;
};

module.exports = updatePriceAndDiscount;
