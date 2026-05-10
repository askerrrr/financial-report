var getTodayPricesAndDiscountsByDayIndex = async (collection, currentdayIndex) =>
  await collection.aggregate([
    {
      $project: { _id: 0, userId: 1, currentDayPricesAndDiscounts: { $arrayElemAt: ["$weeklyPricesAndDiscounts", currentdayIndex] } },
    },
  ]);

export default getTodayPricesAndDiscountsByDayIndex;
