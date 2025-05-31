import calcNetProfit from "./services/calcNetProfit.js";
import createTdElement from "./services/createTdElement.js";
import createInputField from "./services/createInputField.js";
import calcTotalForTheProduct from "./services/calcTotalForTheProduct.js";
import calcAverageSellingPrice from "./services/calcAverageSellingPrice.js";
import calcPaymentsMinusAllСommissions from "./services/calcPaymentsMinusAllСommissions.js";
import calcNetProfitAsAPercentagePerUnit from "./services/calcNetProfitAsAPercentagePerUnit.js";
import calcAveragePaymentsMinusAllСommissions from "./services/calcAveragePaymentsMinusAllСommissions.js";

var url = "/reports/change";

var table = document.getElementById("report");

var createRowForReport = async (report) => {
  var tbody = document.createElement("tbody");

  var { id } = report;

  for (var [index, item] of Object.entries(report.items)) {
    var tr = document.createElement("tr");

    var itemName = await createTdElement(item.itemName);
    var qty = await createTdElement(item.qty);
    var article = await createTdElement(item.article);
    var refundCost = await createTdElement(item.refundCost);
    var allowances = await createTdElement(item.allowances);
    var averageCost = await createTdElement(item.averageCost);
    var buyoutPrice = await createTdElement(item.buyoutPrice);
    var deliveryCost = await createTdElement(item.deliveryCost);
    var WBSalesAmount = await createTdElement(item.WBSalesAmount);
    var numberOfReturns = await createTdElement(item.numberOfReturns);
    var payoutsPerProduct = await createTdElement(item.payoutsPerProduct);

    var inputFieldForCostPrice = await createInputField(
      item.costPrice,
      index,
      "costPrice",
      url,
      id
    );
    var costPrice = await createTdElement(inputFieldForCostPrice);

    var inputFieldForRetailPrice = await createInputField(
      item.retailPrice,
      index,
      "retailPrice",
      url,
      id
    );

    var retailPrice = await createTdElement(inputFieldForRetailPrice);

    var differentDeductions = await createTdElement(item.fines);

    var averageStorageCost = await createTdElement(item.skuStorageCost);

    var paymentsMinusAllСommissions = await calcPaymentsMinusAllСommissions(
      item.payoutsPerProduct,
      item.qty
    );

    var paymentsMinusAllСommissionsTD = await createTdElement(
      paymentsMinusAllСommissions
    );

    var netProfit = await calcNetProfit(item.costPrice);

    var netProfitTD = await createTdElement(netProfit);

    var averageSellingPrice = await calcAverageSellingPrice(
      item.WBSalesAmount,
      item.qty
    );

    var averageSellingPriceTD = await createTdElement(averageSellingPrice);

    var netProfitAsAPercentagePerUnit = await calcNetProfitAsAPercentagePerUnit(
      netProfit,
      item.retailPrice
    );

    var netProfitAsAPercentagePerUnitTD = await createTdElement(
      netProfitAsAPercentagePerUnit
    );

    var totalForTheProduct = await calcTotalForTheProduct(netProfit, item.qty);
    var totalForTheProductTD = await createTdElement(totalForTheProduct);

    tr.append(
      itemName,
      article,
      qty,
      costPrice,
      retailPrice,
      payoutsPerProduct,
      differentDeductions,
      averageStorageCost,
      paymentsMinusAllСommissionsTD,
      netProfitTD,
      WBSalesAmount,
      averageSellingPriceTD,
      netProfitAsAPercentagePerUnitTD,
      totalForTheProductTD
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createRowForReport;
