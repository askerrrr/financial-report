var truncateNum = require("./truncateNum");

var truncateSKUNums = (skus) =>
  skus.map((sku) => {
    for (var key in sku) {
      sku[key] = truncateNum(sku[key]);
    }

    return sku;
  });

module.exports = truncateSKUNums;
