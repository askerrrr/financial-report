var getWeeklyPricesAndDiscounts = async (collection, userId) => {
  var { weeklyPricesAndDiscounts } = await collection.findOne({ userId });
  return { weeklyPricesAndDiscounts };
};

export default getWeeklyPricesAndDiscounts;
