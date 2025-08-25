var getSummaryColumnData = (data) => {
  var payoutsPerProduct = data.slice(0, -4);

  var totalSellerPayoutAmount = data.at(-1);

  var totalStorageCost = data.at(-4);

  var differentDeductions = data.at(-2);

  var paidAcceptanceOfGoods = data.at(-3);

  return {
    totalSellerPayoutAmount,
    totalStorageCost,
    payoutsPerProduct,
    differentDeductions,
    paidAcceptanceOfGoods,
  };
};

module.exports = getSummaryColumnData;
