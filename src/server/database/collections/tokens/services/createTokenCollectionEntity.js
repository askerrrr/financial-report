var { DatabaseError } = require("../../../../customError");

var createTokenCollectionEntity = async (collection, userId) => {
  try {
    var entity = await collection.insertOne({ userId });

    await entity.save();
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createTokenCollectionEntity;
