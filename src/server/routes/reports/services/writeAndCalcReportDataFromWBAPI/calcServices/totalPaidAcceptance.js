var calcTotalPaidAcceptance = async (report) => {
  var acceptance = report.filter((sku) => sku.acceptance);

  var totalPaidAcceptance = acceptance.reduce(
    (acc, i) => acc + i.acceptance,
    0
  );

  return totalPaidAcceptance;
};

module.exports = calcTotalPaidAcceptance;
