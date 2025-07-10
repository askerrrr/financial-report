var button = document.createElement("button");
button.id = "download-report-as-xlsx-button";
button.textContent = "Скачать отчет как эксель";

var downloadReportAsXLSX = async (reportId) => {
  document.body.append(button);

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var url = "/reports/download-report-as-xlsx/" + "userId" + "/" + reportId;

    //window.location.href = url;
  });
};

export default downloadReportAsXLSX;
