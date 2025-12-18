var { DatabaseError } = require("../../../../customError");

var defaultTaxRate = 6;

var mandatoryInsuranceFees = [
  { year: 2023, value: 45842 },
  { year: 2024, value: 49500 },
  { year: 2025, value: 53658 },
  { year: 2026, value: 57390 },
  { year: 2027, value: 61154 },
];

var addNewTaxYearToDb = async (collection, userId, year, session) => {
  try {
    var data = await collection.findOne({ userId }, null, { session: session });
    var taxYears = data.toObject().years;

    var existTaxParams = taxYears.find((params) => params.year === year);

    if (existTaxParams) {
      var nextYear = year + 1;
      var nextYearTaxParams = taxYears.find((params) => params.year === nextYear);

      if (!nextYearTaxParams) {
        var nextYearMandatoryInsuranceFee = mandatoryInsuranceFees.find((i) => i.year === nextYear).value;
        var nextYearPaidTaxAmount = -nextYearMandatoryInsuranceFee;

        await collection.updateOne(
          { userId },
          {
            $push: {
              years: {
                year: nextYear,
                taxRate: defaultTaxRate,
                paidTaxAmount: nextYearPaidTaxAmount,
                mandatoryInsuranceFee: nextYearMandatoryInsuranceFee,
              },
            },
          },
          {
            session: session,
          }
        );
      }

      return existTaxParams;
    }

    var currentYearMandatoryInsuranceFee = mandatoryInsuranceFees.find((i) => i.year === year).value;
    var currentYearPaidTaxAmount = -currentYearMandatoryInsuranceFee;

    await collection.updateOne(
      { userId },
      {
        $push: {
          years: {
            year,
            taxRate: defaultTaxRate,
            paidTaxAmount: currentYearPaidTaxAmount,
            mandatoryInsuranceFee: currentYearMandatoryInsuranceFee,
          },
        },
      },
      {
        session: session,
      }
    );

    return { year, taxRate: defaultTaxRate, paidTaxAmount: currentYearPaidTaxAmount, mandatoryInsuranceFee: currentYearMandatoryInsuranceFee };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = addNewTaxYearToDb;
