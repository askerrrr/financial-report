var calcPaidAcceptancePerItem = (itemName, report) => {
  var item = report.filter((e) => e.sa_name == itemName);

  var acceptancePerItem = item.reduce((acc, i) => acc + i.acceptance, 0);

  return acceptancePerItem;
};

module.exports = calcPaidAcceptancePerItem;
