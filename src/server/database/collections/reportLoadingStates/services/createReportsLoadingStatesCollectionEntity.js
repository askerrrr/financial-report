var createReportsLoadingStatesCollectionEntity = async (collection, userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  await collection.insertOne({ userId }, sessionOpt);
};

module.exports = createReportsLoadingStatesCollectionEntity;
