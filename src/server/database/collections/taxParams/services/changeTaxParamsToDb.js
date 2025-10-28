var { DatabaseError } = require("../../../../customError");

var changeTaxParamsToDb = async (collection, userId, year, ...newTaxParams) => {
  try {
    var query = {};

    newTaxParams.map((item) => {
      for (var key of Object.keys(item)) {
        query[`years.$.${key}`] = item[key];
      }
    });

    var result = await collection.updateOne({ userId, "years.year": year }, { $set: query });

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changeTaxParamsToDb;
