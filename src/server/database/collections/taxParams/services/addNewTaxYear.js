var { DatabaseError } = require("../../../../customError");

var defaultTaxRate = 6;

var defaultTaxParams = [
  { year: 2023, mandatoryInsuranceFee: 45842, paidTaxAmount: -45842, maxInsuranceFee: 0 },
  { year: 2024, mandatoryInsuranceFee: 49500, paidTaxAmount: -49500, maxInsuranceFee: 277571 },
  { year: 2025, mandatoryInsuranceFee: 53658, paidTaxAmount: -53658, maxInsuranceFee: 300888 },
  { year: 2026, mandatoryInsuranceFee: 57390, paidTaxAmount: -57390, maxInsuranceFee: 0 },
  { year: 2027, mandatoryInsuranceFee: 61154, paidTaxAmount: -61154, maxInsuranceFee: 0 },
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
        var defaultNextYearTaxParams = defaultTaxParams.find((i) => i.year);

        await collection.updateOne(
          { userId },
          {
            $push: {
              years: {
                year: nextYear,
                taxRate: defaultTaxRate,
                paidTaxAmount: defaultNextYearTaxParams.paidTaxAmount,
                maxInsuranceFee: defaultNextYearTaxParams.maxInsuranceFee,
                mandatoryInsuranceFee: defaultNextYearTaxParams.mandatoryInsuranceFee,
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

    var defaultCurrentYearTaxParams = defaultTaxParams.find((i) => i.year === year);

    await collection.updateOne(
      { userId },
      {
        $push: {
          years: {
            year,
            taxRate: defaultTaxRate,
            paidTaxAmount: defaultCurrentYearTaxParams.paidTaxAmount,
            maxInsuranceFee: defaultCurrentYearTaxParams.maxInsuranceFee,
            mandatoryInsuranceFee: defaultCurrentYearTaxParams.mandatoryInsuranceFee,
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
