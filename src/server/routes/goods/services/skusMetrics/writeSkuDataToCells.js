var columns = ["B", "C", "D", "E", "F", "G", "H"];

var writeSkuDataToCells = async (ws, sku, indentToNextSku) => {
  for (var i = 0; i < sku.metrics.length; i++) {
    var metric = sku.metrics[i];

    console.log({ year: metric.year, metric });
  }

  return ws;
};

module.exports = writeSkuDataToCells;
