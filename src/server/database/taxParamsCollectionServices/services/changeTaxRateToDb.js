var { DatabaseError } = require("../../../customError");

var changeTaxRateToDb = async (collection, userId, taxRate) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { taxRate },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changeTaxRateToDb;
