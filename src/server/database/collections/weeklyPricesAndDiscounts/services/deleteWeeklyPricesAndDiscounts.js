var deleteWeeklyPricesAndDiscounts = async (collection, userId) => {
  var result = await collection.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts: [] } });

  return result;
};

module.exports = deleteWeeklyPricesAndDiscounts;
