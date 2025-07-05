var { WBAPIError } = require("../../../../customError/");

var url = "https://seller-analytics-api.wildberries.ru/api/v1/paid_storage?";

var createPaidStorageReportTask = async (dateFrom, dateTo, token, userId) => {
  var dateFromParam = "dateFrom=" + dateFrom + "&";
  var dateToParam = "dateTo=" + dateTo;

  var res = await fetch(url + dateFromParam + dateToParam, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    throw new WBAPIError(userId, res.status, res.statusText);
  }

  var { data } = await res.json();

  return data.taskId;
};

module.exports = createPaidStorageReportTask;
