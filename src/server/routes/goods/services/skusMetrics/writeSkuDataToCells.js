var columns = ["B", "C", "D", "E", "F", "G", "H"];

var writeSkuDataToCells = (ws, sku) => {
  var skuDataIndent = 1;

  for (var i = 0; i < sku.metrics.length; i++) {
    var metric = sku.metrics[i];

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
    var indentToProfitMargin = skuDataIndent + 14;
    ws.getCell(columns[i] + indentToQty).value = sku.metrics[i].qty; // "Количество";
    ws.getCell(columns[i] + indentToTax).value = sku.metrics[i].tax; // "Налоги";
    ws.getCell(columns[i] + indentToFines).value = sku.metrics[i].fines; // "Штрафы";
    ws.getCell(columns[i] + indentToSellerPayoutAmount).value = sku.metrics[i].sellerPayoutAmount; // "Выплаты продавцу";
    ws.getCell(columns[i] + indentToDeductionOrPayment).value = sku.metrics[i].deductionOrPayment; // "Удержания/Выплаты";
    ws.getCell(columns[i] + indentToRetailAmount).value = sku.metrics[i].retailAmount; // "Сумма продаж";
    ws.getCell(columns[i] + indentToReturnAmount).value = sku.metrics[i].returnAmount; // "Возвратов";
    ws.getCell(columns[i] + indentToStorageCost).value = sku.metrics[i].storageCost; // "Хранение";
    ws.getCell(columns[i] + indentToDeliveryCost).value = sku.metrics[i].deliveryCost; // "Доставка";
    ws.getCell(columns[i] + indentToAcceptance).value = sku.metrics[i].acceptance; // "Приёмка";
    ws.getCell(columns[i] + indentToInsuranceFee).value = sku.metrics[i].insuranceFee; // "Обязательные страховые взновы";
    ws.getCell(columns[i] + indentToAdditionalInsuranceFee).value = sku.metrics[i].additionalInsuranceFee; // "Дополнительные страховые взновы";
    ws.getCell(columns[i] + indentToNetProfit).value = sku.metrics[i].netProfit; // "Чистая прибыль";
    ws.getCell(columns[i] + indentToProfitMargin).value = sku.metrics[i].profitMargin; // "Маржинальность";
  }

  return ws;
};

module.exports = writeSkuDataToCells;
