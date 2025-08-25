var { DatabaseError } = require("../../../../customError");

var changeInsuranceFeePercentageToDb = async (collection, userId, year, insuranceFeePercentage) => {
  try {
    var result = await collection.updateOne(
      { userId, "years.year": year },
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
