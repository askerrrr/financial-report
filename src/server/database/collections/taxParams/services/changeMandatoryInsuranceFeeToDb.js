var { DatabaseError } = require("../../../../customError");

var changeMandatoryInsuranceFeeToDb = async (collection, userId, year, mandatoryInsuranceFee) => {
  try {
    var result = await collection.updateOne({ userId, "years.year": year }, { $set: { "years.$.mandatoryInsuranceFee": mandatoryInsuranceFee } });

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changeMandatoryInsuranceFeeToDb;
