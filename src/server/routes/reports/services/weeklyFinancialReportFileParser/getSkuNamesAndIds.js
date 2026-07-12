var getSkuNamesAndIds = (workSheet, columnsNames) => {
  var topCellNum = 1;
  var skuIdColumnName;
  var skuNameColumnName;
  var skuNamesAndIds = [];
  var skuNameTitleAlias = "Артикул поставщика";
  var skuIdTitleAlias = "Код номенклатуры";

  for (var colName of columnsNames) {
    var cellAddress = colName + topCellNum;

    var columnTItle = workSheet.getCell(cellAddress)?.value;
    if (columnTItle === skuNameTitleAlias) {
      skuNameColumnName = colName;
    }

    if (columnTItle === skuIdTitleAlias) {
      skuIdColumnName = colName;
    }

    if (skuNameColumnName && skuIdColumnName) {
      break;
    }
  }

  var startRowNum = 2;

  while (startRowNum <= workSheet.actualRowCount) {
    var skuNameCellAddresss = startRowNum + skuNameColumnName;
    var skuName = workSheet.getCell(skuNameCellAddresss)?.value;

    if (skuName) {
      var existSku = skuNamesAndIds.find((sku) => sku?.skuName === skuName);

      if (!existSku) {
        var skuIdCellAddress = startRowNum + skuIdColumnName;
        var skuId = workSheet.getCell(skuIdCellAddress)?.value;

        skuNamesAndIds.push({ skuName, skuId: +skuId, rowNums: [startRowNum] });
      } else {
        existSku.rowNums.push(startRowNum);
      }
    }

    startRowNum++;
  }

  return { skuNamesAndIds };
};

export default getSkuNamesAndIds;
