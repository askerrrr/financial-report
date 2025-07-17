var button = document.getElementById("delete-report-button");

var sendDeletionRequest = async (userId, reportId, year, month) => {
  var res = await fetch("/reports/delete/", {
    method: "DELETE",
    body: JSON.stringify({ userId, reportId, year, month }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var deleteReport = async (report) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmed = confirm("Удалить отчет?");

    if (confirmed) {
      var { userId, reportId, recordTo } = report;
      var { year, month } = recordTo;

      var success = await sendDeletionRequest(userId, reportId, year, month);

      if (success) {
        alert("Отчет успешно удален");

        window.location.href = "/";
      }

      return alert("Не удалось удалить отчет...");
    }

    return;
  });

export default deleteReport;
