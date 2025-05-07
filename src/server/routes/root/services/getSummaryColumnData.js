var getSummaryColumnData = (data) => {
  var payoutsPerProduct = data.slice(0, -4);

  var totalSum = data.at(-1);

  var storageCost = data.at(-4);

  var differentDeductions = data.at(-2);

  var paidAcceptanceOfGoods = data.at(-3);

  return {
    totalSum,
    storageCost,
    payoutsPerProduct,
    differentDeductions,
    paidAcceptanceOfGoods,
  };
};

module.exports = getSummaryColumnData;
