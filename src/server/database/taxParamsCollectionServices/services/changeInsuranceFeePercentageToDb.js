var { DatabaseError } = require("../../../customError");

var changeInsuranceFeePercentageToDb = async (
  collection,
  userId,
  insuranceFeePercentage
) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { "years.$.insuranceFeePercentage": insuranceFeePercentage },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(e, userId);
  }
};

module.exports = changeInsuranceFeePercentageToDb;
