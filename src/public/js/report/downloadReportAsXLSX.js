var button = document.getElementById("download-report-as-xlsx-button");

var downloadReportAsXLSX = async (userId, reportId) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var url = "/reports/download-report-as-xlsx/" + userId + "/" + reportId;

    var res = await fetch(url);

    var blob = await res.blob();

    var downloadUrl = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "download.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);

    a.remove();
  });

export default downloadReportAsXLSX;
