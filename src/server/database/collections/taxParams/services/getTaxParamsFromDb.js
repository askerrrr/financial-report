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
      return data.toObject().years.find((date) => date.year == year);
    }

    return data.toObject().years;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getTaxParamsFromDb;
