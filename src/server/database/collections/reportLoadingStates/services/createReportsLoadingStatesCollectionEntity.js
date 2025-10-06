var createReportsLoadingStatesCollectionEntity = async (collection, userId) => {
  await collection.insertOne({ userId });
};

module.exports = createReportsLoadingStatesCollectionEntity;
