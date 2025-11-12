var setWeeklyPricesAndDiscounts = async (collection, userId, weeklyPricesAndDiscounts) => {
  var result = await collection.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts } });
  return result.acknowledged;
};

module.exports = setWeeklyPricesAndDiscounts;
