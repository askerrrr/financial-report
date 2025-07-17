var { WBAPIError } = require("../../../../customError/");

var createPaidStorageReportTask = async (dateFrom, dateTo, token, userId) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage?dateFrom=${dateFrom}&dateTo=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    var errMsg = "Возникла ошибка при получении отчета о платном хранении";

    throw new WBAPIError(userId, res.status, res.statusText, errMsg);
  }

  var { data } = await res.json();

  return data.taskId;
};

module.exports = createPaidStorageReportTask;
