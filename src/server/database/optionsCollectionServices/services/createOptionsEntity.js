var { DatabaseError } = require("../../../customError");

var createOptionsEntity = async (collection, userId) => {
  try {
    var optionsEntity = await collection.insertOne({ userId });

    await optionsEntity.save();
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createOptionsEntity;
