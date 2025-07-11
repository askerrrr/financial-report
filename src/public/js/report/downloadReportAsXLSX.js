var button = document.getElementById("download-report-as-xlsx-button");

var downloadReportAsXLSX = async (report) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var { userId, reportId, dateFrom, dateTo } = report;

    var url = "/reports/download-report-as-xlsx/" + userId + "/" + reportId;

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

export default downloadReportAsXLSX;
