var { DatabaseError } = require("../../../../customError");

var addNewTaxYearToDb = async (collection, userId, year) => {
  try {
    var { years } = await collection.findOne({ userId });

    var existYear = years.find((date) => date.year == year);

    if (existYear) {
      return existYear;
    }

    await collection.updateOne(
      { userId },
      {
        $push: { years: { year } },
      }
    );

    var defaultTaxOptions = {
      year,
      taxRate: 6,
      paidTaxAmount: 0,
      paidInsuranceFee: 0,
      mandatoryInsuranceFee: 0,
      isInsuranceFeePaid: false,
      insuranceFeePercentage: 10,
    };

    return defaultTaxOptions;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = addNewTaxYearToDb;
