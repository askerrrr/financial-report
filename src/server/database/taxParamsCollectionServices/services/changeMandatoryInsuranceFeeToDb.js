var { DatabaseError } = require("../../../customError");

var changeMandatoryInsuranceFeeToDb = async (
  collection,
  userId,
  mandatoryInsuranceFee
) => {
  try {
    var result = await collection.updateOne(
      { userId },
      { $set: { "years.$.mandatoryInsuranceFee": mandatoryInsuranceFee } }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changeMandatoryInsuranceFeeToDb;
