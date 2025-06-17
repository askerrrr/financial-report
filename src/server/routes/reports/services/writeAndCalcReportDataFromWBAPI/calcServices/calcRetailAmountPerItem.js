var calcRetailAmountPerItem = async (itemName, report) => {
  var item = report.filter((e) => e.sa_name === itemName);

  var retailAmountPerItem = item.reduce((acc, i) => acc + i.retail_amount, 0);

  return retailAmountPerItem;
};

module.exports = calcRetailAmountPerItem;
