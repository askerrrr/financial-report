var shortNum = require("./shortNum");

var truncateSKUNums = async (skus) => {
  var result = await Promise.all(
    skus.map(async (sku) => {
      for (var value of Object.keys(sku)) {
        if (typeof sku[value] == "number") {
          sku[value] = await shortNum(sku[value]);
        }
      }

      return sku;
    })
  );

  return result;
};

module.exports = truncateSKUNums;
