var calcFinalNetProfitPerItem = async (averageNetProfitPerItem, costPrice) => {
  var finalNetProfitPerItem = averageNetProfitPerItem - costPrice;

  return Math.round(finalNetProfitPerItem);
};

module.exports = calcFinalNetProfitPerItem;
