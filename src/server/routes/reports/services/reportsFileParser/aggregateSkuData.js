import calculateAvrgStorageCostForEachReportItem from "./calculateAvrgStorageCostForEachReportItem.js";

var mainReportType = 1;

var aggregateSkuData = (workSheet, skuNamesAndIds, reportId, requiredColumnsName, dateFrom, dateTo, avrgStorageCostForEachItem = 0) => {
  var skus = [];
  var avrgStorageDataForEachSku = [];

  for (var { skuId, skuName, rowNums } of skuNamesAndIds) {
    for (var rowNum of rowNums) {
      var sku = {};

      sku.nmId = skuId;
      sku.reportId = reportId;
      sku.vendorCode = skuName;
      sku.dateFrom = dateFrom;
      sku.dateTo = dateTo;

      var qtyCellAddress = requiredColumnsName.qtyColumn + rowNum;
      var finesCellAddress = requiredColumnsName.finesColumn + rowNum;
      var saleDateCellAddress = requiredColumnsName.saleDateColumn + rowNum;
      var orderDateCellAddress = requiredColumnsName.orderDateColumn + rowNum;
      var retailPriceCellAddress = requiredColumnsName.retailPriceColumn + rowNum;
      var docTypeNameCellAddress = requiredColumnsName.docTypeNameColumn + rowNum;
      var forPayCellAddress = requiredColumnsName.sellerPayoutAmountColumn + rowNum;
      var retailAmountCellAddress = requiredColumnsName.retailAmountColumn + rowNum;
      var returnAmountCellAddress = requiredColumnsName.returnAmountColumn + rowNum;
      var deliveryCostCellAddress = requiredColumnsName.deliveryCostColumn + rowNum;
      var additionalPaymentCellAddress = requiredColumnsName.additionalPaymentColumn + rowNum;
      var deductionOrPaymentCellAddress = requiredColumnsName.deductionOrPaymentColumn + rowNum;
      var paidAcceptanceCellAddress = requiredColumnsName.paidAcceptanceColumn + rowNum;

      sku.reportType = mainReportType;
      sku.paidStorage = avrgStorageCostForEachItem;
      sku.quantity = workSheet.getCell(qtyCellAddress).value || 0;
      sku.penalty = workSheet.getCell(finesCellAddress).value || 0;
      sku.forPay = workSheet.getCell(forPayCellAddress).value || 0;
      sku.saleDt = workSheet.getCell(saleDateCellAddress).value || 0;
      sku.retailPrice = workSheet.getCell(retailPriceCellAddress).value || 0;
      sku.docTypeName = workSheet.getCell(docTypeNameCellAddress).value || "";
      sku.retailAmount = workSheet.getCell(retailAmountCellAddress).value || 0;
      sku.deliveryService = workSheet.getCell(deliveryCostCellAddress).value || 0;
      sku.deduction = workSheet.getCell(deductionOrPaymentCellAddress).value || 0;
      sku.paidAcceptance = workSheet.getCell(paidAcceptanceCellAddress).value || 0;
      sku.additionalPayment = workSheet.getCell(additionalPaymentCellAddress).value || 0;

      skus.push(sku);
    }

    var storageCostPerSku = avrgStorageCostForEachItem * rowNums.length;
    avrgStorageDataForEachSku.push({ vendorCode: skuName, warehousePrice: storageCostPerSku });
  }

  return { skus, avrgStorageDataForEachSku };
};

export default aggregateSkuData;
