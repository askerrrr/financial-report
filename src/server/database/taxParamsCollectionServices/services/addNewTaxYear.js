var { DatabaseError } = require("../../../customError");

var addNewTaxYearToDb = async (collection, userId, year) => {
  try {
    var { years } = await collection.findOne({ userId });

    var yearIsExists = years.find((date) => date.year === year);

    if (yearIsExists) {
      return;
    }

    var result = await collection.updateOne(
      { userId },
      {
        $push: { years: { year } },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = addNewTaxYearToDb;
