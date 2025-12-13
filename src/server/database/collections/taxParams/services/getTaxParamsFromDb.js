var { DatabaseError } = require("../../../../customError");

var getTaxParamsFromDb = async (collection, userId, year, session) => {
  try {
    var data;

    if (session) {
      data = await collection.findOne({ userId }, null, { session: session });
    } else {
      data = await collection.findOne({ userId });
    }

    if (year) {
      return data.years.find((date) => date.year == year);
    }

    return data.years;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getTaxParamsFromDb;
