var calc = require("../calcServices");
var truncateTotals = require("./truncateTotals");

var processReportTotals = async (skus, propPostfix = "") => {
  var report = {};

  report["totalFines" + propPostfix] = calc.sum(skus, "fines" + propPostfix);
  report["totalProfit" + propPostfix] = calc.sum(skus, "profit" + propPostfix);
  report["totalTaxAmount" + propPostfix] = calc.sum(skus, "tax" + propPostfix);
  report["totalDeliveryCost" + propPostfix] = calc.sum(skus, "deliveryCost" + propPostfix);
  report["totalReturnAmount" + propPostfix] = calc.sum(skus, "returnAmount" + propPostfix);
  report["totalRetailAmount" + propPostfix] = calc.sum(skus, "retailAmount" + propPostfix);
  report["totalPaidAcceptance" + propPostfix] = calc.sum(skus, "acceptance" + propPostfix);
  report["totalAdditionalPayment" + propPostfix] = calc.sum(skus, "additionalPayment" + propPostfix);
  report["totalDeductionOrPayment" + propPostfix] = calc.sum(skus, "deductionOrPayment" + propPostfix);
  report["totalSellerPayoutAmount" + propPostfix] = calc.sum(skus, "sellerPayoutAmount" + propPostfix);

  report = truncateTotals(report);

  return report;
};

module.exports = processReportTotals;
