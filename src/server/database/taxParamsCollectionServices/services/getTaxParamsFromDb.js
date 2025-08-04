var { DatabaseError } = require("../../../customError");

var getTaxParamsFromDb = async (collection, userId, year) => {
  try {
    var { years } = await collection.findOne({ userId, "years.year": year });

    return years.find((date) => date.year == year);
  } catch (e) {
    throw new DatabaseError();
  }
};

module.exports = getTaxParamsFromDb;
