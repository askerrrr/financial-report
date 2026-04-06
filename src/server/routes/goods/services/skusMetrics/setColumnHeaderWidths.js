var columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

var setColumnHeaderWidths = (ws, listGoods) => {
  var listGoodsSortedBySkuMetricsLength = listGoods.sort((a, b) => a.length - b.length);
  var skuWithMaxMetrics = listGoodsSortedBySkuMetricsLength[listGoodsSortedBySkuMetricsLength.length - 1];

  for (var i = 0; i <= skuWithMaxMetrics.metrics.length; i++) {
    ws.getColumn(columns[i]).width = 35;
  }

  return ws;
};

export default setColumnHeaderWidths;
