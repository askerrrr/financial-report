var getWeeklyPricesAndDiscounts = async (collection, userId) => {
  var { weeklyPricesAndDiscounts } = await collection.findOne({ userId });
  return { weeklyPricesAndDiscounts };
};

module.exports = getWeeklyPricesAndDiscounts;
