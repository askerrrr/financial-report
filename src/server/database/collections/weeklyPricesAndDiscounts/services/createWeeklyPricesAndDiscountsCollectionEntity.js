var createWeeklyPricesAndDiscountsCollectionEntity = async (collection, userId) => await collection.insertOne({ userId });

module.exports = createWeeklyPricesAndDiscountsCollectionEntity;
