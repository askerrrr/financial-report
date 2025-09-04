var { DatabaseError } = require("../../../../customError");
var mandatoryInsuranceFees = [
  { year: 2024, value: 49500 },
  { year: 2025, value: 53658 },
  { year: 2026, value: 57390 },
  { year: 2027, value: 61154 },
];

var addNewTaxYearToDb = async (collection, userId, year) => {
  try {
    var mandatoryInsuranceFee;

    var { years } = await collection.findOne({ userId });
    var existTaxYear = years.find((date) => date.year == year);

    if (existTaxYear) {
      var nextTaxYear = ++year;
      var nextTaxYearIsExist = years.find((date) => date.year == nextTaxYear);
      mandatoryInsuranceFee = mandatoryInsuranceFees.find((item) => item.year === nextTaxYear).value;
      var nextYearPaidTaxAmount = -mandatoryInsuranceFee;

      if (!nextTaxYearIsExist) {
        await collection.updateOne(
          { userId },
          {
            $push: { years: { year: nextTaxYear, mandatoryInsuranceFee, paidTaxAmount: nextYearPaidTaxAmount } },
          }
        );
      }

      return existTaxYear;
    }

    mandatoryInsuranceFee = mandatoryInsuranceFees.find((item) => item.year === year).value;

    await collection.updateOne(
      { userId },
      {
        $push: { years: { year, mandatoryInsuranceFee } },
      }
    );

    return { taxRate: 6, paidTaxAmount: 0 };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = addNewTaxYearToDb;
