var firstColumnName = "A";

var writeCellNamesToFirstColumn = function (ws, sku, indentToNextSku) {
  var indentToQty = indentToNextSku + 1;
  var indentToTax = indentToNextSku + 2;
  var indentToFines = indentToNextSku + 3;
  var indentToSellerPayoutAmount = indentToNextSku + 4;
  var indentToDeductionOrPayment = indentToNextSku + 5;
  var indentToRetailAmount = indentToNextSku + 6;
  var indentToReturnAmount = indentToNextSku + 7;
  var indentToStorageCost = indentToNextSku + 8;
  var indentToDeliveryCost = indentToNextSku + 9;
  var indentToAcceptance = indentToNextSku + 10;
  var indentToInsuranceFee = indentToNextSku + 11;
  var indentToAdditionalInsuranceFee = indentToNextSku + 12;
  var indentToNetProfit = indentToNextSku + 13;
  var indentToAvrgNetProfit = indentToNextSku + 14;
  var indentToProfitMargin = indentToNextSku + 15;

  var skuNameCellAddress = firstColumnName + indentToNextSku;

  ws.getCell(skuNameCellAddress).value = sku.skuName.toUpperCase();
  ws.getCell(firstColumnName + indentToQty).value = "Количество";
  ws.getCell(firstColumnName + indentToTax).value = "Налоги";
  ws.getCell(firstColumnName + indentToFines).value = "Штрафы";
  ws.getCell(firstColumnName + indentToSellerPayoutAmount).value = "Выплаты продавцу";
  ws.getCell(firstColumnName + indentToDeductionOrPayment).value = "Удержания/Выплаты";
  ws.getCell(firstColumnName + indentToRetailAmount).value = "Сумма продаж";
  ws.getCell(firstColumnName + indentToReturnAmount).value = "Возвратов";
  ws.getCell(firstColumnName + indentToStorageCost).value = "Хранение";
  ws.getCell(firstColumnName + indentToDeliveryCost).value = "Доставка";
  ws.getCell(firstColumnName + indentToAcceptance).value = "Приёмка";
  ws.getCell(firstColumnName + indentToInsuranceFee).value = "Обязательные страховые взновы";
  ws.getCell(firstColumnName + indentToAdditionalInsuranceFee).value = "Дополнительные страховые взновы";
  ws.getCell(firstColumnName + indentToNetProfit).value = "Чистая прибыль";
  ws.getCell(firstColumnName + indentToAvrgNetProfit).value = "Среднеяя чистая прибыль";
  ws.getCell(firstColumnName + indentToProfitMargin).value = "Маржинальность";

  return ws;
};

export default writeCellNamesToFirstColumn;
