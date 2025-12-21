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
      var { skus, ...totals } = report;
      var reportData = { reportTotals: totals };
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
