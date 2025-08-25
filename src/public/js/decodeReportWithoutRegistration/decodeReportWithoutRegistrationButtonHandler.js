var decodeReportWithoutRegistrationButtonHandler = async () => {
  var skusTbody = document.getElementById("skus-tbody");
  var totalTbody = document.getElementById("totals-tbody");
  var skusTable = document.getElementById("skus-table");
  var totalsTable = document.getElementById("totals-table");
  var downloadReportAsXLSXButton = document.getElementById("download-report-as-xlsx-button");
  var decodeReportWithoutRegistrationButton = document.getElementById("decode-report-without-registration-button");

  decodeReportWithoutRegistrationButton.onclick = async () => {
    if (skusTbody.childNodes.length) {
      var confirmed = confirm("Получение нового отчета привёдет к потере текущего.\nПродолжить?");

      if (confirmed) {
        skusTbody.innerHTML = "";
        totalTbody.innerHTML = "";

        skusTable.style.display = "none";
        totalsTable.style.display = "none";
        downloadReportAsXLSXButton.style.display = "none";
      }

      return;
    }

    window["dialog"].show();
  };
};

decodeReportWithoutRegistrationButtonHandler();
