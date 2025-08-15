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
      var { userId, reportId, recordTo, totalInsuranceFee, totalTaxAmount } =
        report;
      var { year, month } = recordTo;

      var reportData = {
        year,
        month,
        userId,
        reportId,
        totalTaxAmount,
        totalInsuranceFee,
      };

      var success = await sendDeletionRequest(reportData);

      if (success) {
        alert("Отчет успешно удален");

        window.location.href = "/";
      }

      return alert("Не удалось удалить отчет...");
    }

    return;
  });

export default deleteReportHandler;
