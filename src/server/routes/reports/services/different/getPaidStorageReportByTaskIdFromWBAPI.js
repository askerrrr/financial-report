var { WBAPIError } = require("../../../../customError/");

var getPaidStorageReportByTaskIdFromWBAPI = async (taskId, token, userId) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/download`;

  var res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    var errMsg = "Возникла ошибка при получении отчета о платном хранении";

    throw new WBAPIError(userId, res.status, res.statusText, errMsg);
  }

  var paidStorageReport = await res.json();

  return paidStorageReport;
};

module.exports = getPaidStorageReportByTaskIdFromWBAPI;
