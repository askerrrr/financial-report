import createThElement from "../../../../../report/table/services/createThElement.js";

var createReportsTableHead = async () => {
  var reportPeriod = await createThElement("Период отчета");

  var totalFinalProfit = await createThElement("Чистая прибыль");

  var totalProductCosts = await createThElement("Затраты на товар");

  var totalTaxAmount = await createThElement("Налоги");

  var financesAccounted = await createThElement("Финансы учтены");

  var reportLink = await createThElement("");

  var tr = document.createElement("tr");

  tr.append(reportPeriod, totalFinalProfit, totalProductCosts, totalTaxAmount, financesAccounted, reportLink);

  var thead = document.createElement("thead");
  thead.append(tr);

  return thead;
};

export default createReportsTableHead;
