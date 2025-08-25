var { DatabaseError } = require("../../../../customError");

var changePaidInsuranceFeeToDb = async (collection, userId, year, paidInsuranceFee) => {
  try {
    var result = await collection.updateOne({ userId, "years.year": year }, { $set: { "years.$.paidInsuranceFee": paidInsuranceFee } });

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changePaidInsuranceFeeToDb;
