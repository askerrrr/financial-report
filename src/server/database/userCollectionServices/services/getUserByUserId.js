var getUserByUserId = async (collection, userId) =>
  await collection.findOne({ userId }).exec();

module.exports = getUserByUserId;
