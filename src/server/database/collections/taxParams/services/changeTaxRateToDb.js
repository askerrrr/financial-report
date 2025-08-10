var { DatabaseError } = require("../../../../customError");

var changeTaxRateToDb = async (collection, userId, year, taxRate) => {
  try {
    var result = await collection.updateOne(
      { userId, "years.year": year },
      {
        $set: { "years.$.taxRate": taxRate },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changeTaxRateToDb;
