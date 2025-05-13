var createReportsEntity = async (collection, userId) => {
  var reportsEntity = await collection.insertOne({ userId });

  var result = await reportsEntity.save();

  return (result = reportsEntity);
};
