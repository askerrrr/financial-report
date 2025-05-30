var createTokenCollectionEntity = async (collection, userId) => {
  var entity = await collection.insertOne({ userId });

  await entity.save();
};

module.exports = createTokenCollectionEntity;
