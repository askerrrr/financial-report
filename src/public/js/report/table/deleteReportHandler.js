var button = document.getElementById("delete-report-button");

var sendDeletionRequest = async (reportData) => {
  var res = await fetch("/reports/delete/", {
    method: "DELETE",
    body: JSON.stringify({ ...reportData }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var deleteReportHandler = async (report) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmed = confirm("Удалить отчет?");

    if (confirmed) {
      var { userId, reportId, dateFrom, dateTo, recordTo, totalInsuranceFee, totalTaxAmount } = report;
      var { year, month } = recordTo;

      var reportData = {
        year,
        month,
        userId,
        dateFrom,
        dateTo,
        reportId,
        totalTaxAmount,
        isCrossYearReport: report.crossesTaxYears,
        totalInsuranceFee,
        totalInsuranceFeeInCurrentYear: report?.totalInsuranceFeeInCurrentYear ?? 0,
        totalInsuranceFeeInNextYear: report?.totalInsuranceFeeInNextYear ?? 0,
        totalTaxAmountInCurrentYear: report?.totalTaxAmountInCurrentYear ?? 0,
        totalTaxAmountInNextYear: report?.totalTaxAmountInNextYear ?? 0,
      };

      var success = await sendDeletionRequest(reportData);

      if (success) {
        alert("Отчет успешно удален");
        window.location.href = "/";
        return;
      } else {
        alert("Не удалось удалить отчет...");
        return;
      }
    }

    return;
  });

export default deleteReportHandler;
