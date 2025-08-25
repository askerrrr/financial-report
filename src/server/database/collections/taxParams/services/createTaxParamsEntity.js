var { DatabaseError } = require("../../../../customError");

var createTaxParamsEntity = async (collection, userId) => {
  try {
    var optionsEntity = await collection.insertOne({ userId });

    await optionsEntity.save();
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createTaxParamsEntity;
