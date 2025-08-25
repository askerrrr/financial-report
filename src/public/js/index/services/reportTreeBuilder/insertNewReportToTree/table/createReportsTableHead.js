import createThElement from "../../../../../report/row/services/createThElement.js";

var createReportsTableHead = async () => {
  var reportPeriod = await createThElement("Период отчета");

  var totalFinalProfit = await createThElement("Чистая прибыль");

  var totalProductCosts = await createThElement("Затраты на товар");

  var totalTaxAmount = await createThElement("Налоги");

  var reportLink = await createThElement("");

  var tr = document.createElement("tr");

  tr.append(
    reportPeriod,
    totalFinalProfit,
    totalProductCosts,
    totalTaxAmount,
    reportLink
  );

  var thead = document.createElement("thead");
  thead.append(tr);

  return thead;
};

export default createReportsTableHead;
