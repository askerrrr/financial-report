import getCookieByName from "../../getCookieByName.js";

var createMonthlyReportDownloadButton = async (reportIds, year, month) => {
  var button = document.createElement("button");

  var reportIds = reportIds.map((e) => e.reportId);

  button.id = reportIds;

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var userId = await getCookieByName("userId");

    var url = "/reports/download-reports-as-xlsx/";

    var res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ userId, reportIds }),
      headers: { "Content-Type": "application/json" },
    });

    var blob = await res.blob();

    var downloadUrl = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = downloadUrl;

    var fileName = `Отчеты за ${month} ${year}г`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);

    a.remove();
  });

  return button;
};

export default createMonthlyReportDownloadButton;
