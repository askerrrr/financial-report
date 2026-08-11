var deleteWeeklyPricesAndDiscounts = async (collection, userId) => {
  var result = await collection.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts: [], uploadId: 0 } });

  return result;
};

export default deleteWeeklyPricesAndDiscounts;
