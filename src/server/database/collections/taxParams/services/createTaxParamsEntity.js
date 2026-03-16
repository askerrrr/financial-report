var { DatabaseError } = require("../../../../customError");

var createTaxParamsEntity = async (collection, userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  try {
    var optionsEntity = await collection.insertOne({ userId }, sessionOpt);

    await optionsEntity.save();
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createTaxParamsEntity;
