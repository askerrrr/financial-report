import calcNetProfit from "./services/calcNetProfit.js";
import createTdElement from "./services/createTdElement.js";
import createInputField from "./services/createInputField.js";
import calcPaymentsMinusAllСommissions from "./services/calcPaymentsMinusAllСommissions.js";
import calcAveragePaymentsMinusAllСommissions from "./services/calcAveragePaymentsMinusAllСommissions.js";

var table = document.getElementById("report");

var createRowForReport = async (report) => {
  var tbody = document.createElement("tbody");

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
      "costPrice"
    );
    var costPrice = await createTdElement(inputFieldForCostPrice);

    var inputFieldForRetailPrice = await createInputField(
      item.retailPrice,
      index,
      "retailPrice"
    );

    var retailPrice = await createTdElement(inputFieldForRetailPrice);

    var differentDeductions = await createTdElement(item.fines);

    var averageStorageCost = await createTdElement(item.skuStorageCost);

    var paymentsMinusAllСommissions = await calcPaymentsMinusAllСommissions(
      item
    );

    var paymentsMinusAllСommissionsTD = await createTdElement(
      paymentsMinusAllСommissions
    );

    var averagePaymentsMinusAllСommissions =
      await calcAveragePaymentsMinusAllСommissions(
        paymentsMinusAllСommissions,
        item.qty
      );

    var averagePaymentsMinusAllСommissionsTD = await createTdElement(
      averagePaymentsMinusAllСommissions
    );

    var netProfit = await calcNetProfit(
      averagePaymentsMinusAllСommissions,
      item.costPrice
    );

    var netProfitTD = await createTdElement(netProfit);

    var averageSellingPrice = await createTdElement("averageSellingPrice");

    var netProfitAsAPercentagePerUnit = await createTdElement("%");

    var totalForTheProduct = await createTdElement("Всего");

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
      averagePaymentsMinusAllСommissionsTD,
      netProfitTD,
      WBSalesAmount,
      averageSellingPrice,
      netProfitAsAPercentagePerUnit,
      totalForTheProduct
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createRowForReport;
