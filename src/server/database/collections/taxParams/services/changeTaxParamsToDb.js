var { DatabaseError } = require("../../../../customError");

var changeTaxParamsToDb = async (collection, userId, year, session, ...newTaxParams) => {
  try {
    var query = {};

    newTaxParams.map((item) => {
      for (var key of Object.keys(item)) {
        query[`years.$.${key}`] = item[key];
      }
    });

    var result;
    if (session) {
      result = await collection.updateOne(
        { userId, "years.year": year },
        { $set: query },
        { session: session }
      );
    } else {
      result = await collection.updateOne({ userId, "years.year": year }, { $set: query });
    }

    return result.acknowledged;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changeTaxParamsToDb;
