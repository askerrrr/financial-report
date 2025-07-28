var { DatabaseError } = require("../../../customError");

var changePaidTaxAmountToDb = async (collection, userId, paidTaxAmount) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { paidTaxAmount },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changePaidTaxAmountToDb;
