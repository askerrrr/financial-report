var { DatabaseError } = require("../../../../customError");

var getTaxParamsFromDb = async (collection, userId, year) => {
  try {
    var { years } = await collection.findOne({ userId });

    if (year) {
      return years.find((date) => date.year == year);
    }

    return years;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getTaxParamsFromDb;
