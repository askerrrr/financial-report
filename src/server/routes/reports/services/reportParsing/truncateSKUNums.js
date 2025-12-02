var truncateSKUNums = (skus) =>
  skus.map((sku) => {
    for (var key of Object.keys(sku)) {
      if (typeof sku[key] == "number" && !isNaN(sku[key])) {
        sku[key] = sku[key].truncate();
      }
    }

    return sku;
  });

module.exports = truncateSKUNums;
