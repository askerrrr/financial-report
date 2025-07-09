var calcTotalReturnAmount = async (skus) =>
  skus.reduce((acc, i) => acc + i.return_amount, 0);

module.exports = calcTotalReturnAmount;
