var button = document.getElementById("download-report-as-xlsx-button");

var downloadReportAsXLSX = async (reportId) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var url = "/reports/download-report-as-xlsx/" + "userId" + "/" + reportId;

    //window.location.href = url;
  });

export default downloadReportAsXLSX;
