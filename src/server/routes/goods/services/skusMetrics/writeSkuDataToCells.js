var columns = ["B", "C", "D", "E", "F", "G", "H"];

var writeSkuDataToCells = (ws, sku, skuDataIndent) => {
  for (var i = 0; i < sku.metrics.length; i++) {
    var metric = sku.metrics[i];

    var indentToYear = skuDataIndent;
    var indentToQty = skuDataIndent + 1;
    var indentToTax = skuDataIndent + 2;
    var indentToFines = skuDataIndent + 3;
    var indentToSellerPayoutAmount = skuDataIndent + 4;
    var indentToDeductionOrPayment = skuDataIndent + 5;
    var indentToRetailAmount = skuDataIndent + 6;
    var indentToReturnAmount = skuDataIndent + 7;
    var indentToStorageCost = skuDataIndent + 8;
    var indentToDeliveryCost = skuDataIndent + 9;
    var indentToAcceptance = skuDataIndent + 10;
    var indentToInsuranceFee = skuDataIndent + 11;
    var indentToAdditionalInsuranceFee = skuDataIndent + 12;
    var indentToNetProfit = skuDataIndent + 13;
    var indentToAvrgNetProfit = skuDataIndent + 14;
    var indentToProfitMargin = skuDataIndent + 15;

    var avrgNetProfit = +(metric.netProfit / metric.qty).toFixed(2);
    if (isNaN(avrgNetProfit)) {
      avrgNetProfit = 0;
    }

    ws.getCell(columns[i] + indentToYear).value = metric.year;
    ws.getCell(columns[i] + indentToQty).value = metric.qty;
    ws.getCell(columns[i] + indentToTax).value = metric.tax;
    ws.getCell(columns[i] + indentToFines).value = metric.fines;
    ws.getCell(columns[i] + indentToSellerPayoutAmount).value = metric.sellerPayoutAmount;
    ws.getCell(columns[i] + indentToDeductionOrPayment).value = metric.deductionOrPayment;
    ws.getCell(columns[i] + indentToRetailAmount).value = metric.retailAmount;
    ws.getCell(columns[i] + indentToReturnAmount).value = metric.returnAmount;
    ws.getCell(columns[i] + indentToStorageCost).value = metric.storageCost;
    ws.getCell(columns[i] + indentToDeliveryCost).value = metric.deliveryCost;
    ws.getCell(columns[i] + indentToAcceptance).value = metric.acceptance;
    ws.getCell(columns[i] + indentToInsuranceFee).value = metric.insuranceFee;
    ws.getCell(columns[i] + indentToAdditionalInsuranceFee).value = metric.additionalInsuranceFee;
    ws.getCell(columns[i] + indentToNetProfit).value = metric.netProfit;
    ws.getCell(columns[i] + indentToAvrgNetProfit).value = avrgNetProfit;
    ws.getCell(columns[i] + indentToProfitMargin).value = metric.profitMargin;
  }

  return ws;
};

export default writeSkuDataToCells;
