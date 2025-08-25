var button = document.getElementById("download-report-as-xlsx-button");

var getCostPricesValueFromTable = async (skusQty) => {
  var costPrices = [];

  for (var i = 0; i < skusQty; i++) {
    var costPrice = document.getElementById("costprice-" + i).textContent;

    costPrices.push(+costPrice);
  }

  return costPrices;
};

var downloadReportAsXLSXButtonHandler = async (report, url) =>
  (button.onclick = async (e) => {
    e.preventDefault();

    var { dateFrom, dateTo } = report;

    var costPrices = await getCostPricesValueFromTable(report.skus.length);

    var allCostPricesNonZero = costPrices.every((costPrice) => costPrice > 0);

    if (!allCostPricesNonZero) {
      return alert("Для скачивания файла нужно установить себестоимости для товаров");
    }

    var res = await fetch(url);

    var blob = await res.blob();

    var downloadUrl = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = downloadUrl;

    var fileName = `Расшифровка отчета с ${dateFrom} по ${dateTo} .xlsx`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);

    a.remove();
  });

export default downloadReportAsXLSXButtonHandler;
