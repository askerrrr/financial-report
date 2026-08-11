var setWeeklyPricesAndDiscounts = async (collection, userId, weeklyPricesAndDiscounts, session) => {
  var result = await collection.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts } }, { session: session });
  return result.acknowledged;
};

export default setWeeklyPricesAndDiscounts;
