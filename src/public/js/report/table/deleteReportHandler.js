var button = document.getElementById("delete-report-button");

var sendDeletionRequest = async (reportId) => {
  var res = await fetch("/reports/delete/", {
    method: "DELETE",
    body: JSON.stringify({ reportId }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var deleteReportHandler = async (reportId) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmed = confirm("Удалить отчет?");

    if (confirmed) {
      var success = await sendDeletionRequest(reportId);

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
