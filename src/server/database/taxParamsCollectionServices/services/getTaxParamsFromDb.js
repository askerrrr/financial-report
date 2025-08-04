var { DatabaseError } = require("../../../customError");

var getTaxParamsFromDb = async (collection, userId, year) => {
  try {
    var taxParams = await collection.findOne({ userId, "years.year": year });

    return taxParams.toObject();
  } catch (e) {
    throw new DatabaseError();
  }
};

module.exports = getTaxParamsFromDb;
