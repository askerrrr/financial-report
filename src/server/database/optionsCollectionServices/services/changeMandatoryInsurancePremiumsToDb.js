var { DatabaseError } = require("../../../customError");

var changeMandatoryInsurancePremiumsToDb = async (
  collection,
  userId,
  mandatoryInsurancePremiums
) => {
  try {
    var result = await collection.updateOne(
      { userId },
      { $set: { mandatoryInsurancePremiums } }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changeMandatoryInsurancePremiumsToDb;
