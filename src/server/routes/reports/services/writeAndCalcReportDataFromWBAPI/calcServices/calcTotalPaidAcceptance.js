var calcTotalPaidAcceptance = (report) => {
  var acceptance = report.filter((item) => item.acceptance);

  var totalPaidAcceptance = acceptance.reduce(
    (acc, i) => acc + i.acceptance,
    0
  );

  return totalPaidAcceptance;
};

module.exports = calcTotalPaidAcceptance;
