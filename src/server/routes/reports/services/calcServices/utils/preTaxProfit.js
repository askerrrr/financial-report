import truncateNum from "../../reportParsing/truncateNum.js";

var calcPreTaxProfit = (sku, propPostfix = "") => {
  var productCosts;

  if (sku["profit" + propPostfix] === 0 || sku["qty" + propPostfix] === 0) {
    productCosts = 0;
  } else {
    productCosts = sku["qty" + propPostfix] * sku.costPrice;
  }

  var preTaxProfit = sku["profit" + propPostfix] - sku["otherExpenses" + propPostfix] - productCosts;
  return truncateNum(preTaxProfit);
};

export default calcPreTaxProfit;
