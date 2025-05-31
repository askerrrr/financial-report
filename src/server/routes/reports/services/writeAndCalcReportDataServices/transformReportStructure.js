var transformReportStructure = async (data, userId) => {
  var transformedReportFields = [];

  for (var i = 0; i < data.qty.length; i++) {
    transformedReportFields.push({
      qty: data.qty[i],
      fines: data.fines[i],
      article: data.article[i],
      itemName: data.itemName[i],
      refundCost: data.refundCost[i],
      allowances: data.allowances[i],
      averageCost: data.averageCost[i],
      buyoutPrice: data.buyoutPrice[i],
      deliveryCost: data.deliveryCost[i],
      WBSalesAmount: data.WBSalesAmount[i],
      skuStorageCost: data.skuStorageCost[i],
      numberOfReturns: data.numberOfReturns[i],
      payoutsPerProduct: data.payoutsPerProduct[i],
    });
  }

  var report = {};

  report.id = data.id;
  report.userId = userId;
  report.totalSum = data.totalSum;
  report.totalProducts = data.totalProducts;
  report.totalStorageCost = data.totalStorageCost;
  report.differentDeductions = data.differentDeductions;
  report.paidAcceptanceOfGoods = data.paidAcceptanceOfGoods;
  report.items = transformedReportFields;

  return report;
};

module.exports = transformReportStructure;
