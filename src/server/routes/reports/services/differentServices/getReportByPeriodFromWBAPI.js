var { WBAPIError } = require("../../../../customError/customError");

var url =
  "https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod?";

var getReportByPeriodFromWBAPI = async (dateFrom, dateTo, token, userId) => {
  var dateFromParam = "dateFrom=" + dateFrom + "&";
  var dateToParam = "dateTo=" + dateTo;

  var res = await fetch(url + dateFromParam + dateToParam, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    throw new WBAPIError(userId, res.status, res.statusText);
  }

  var report = await res.json();

  return report;
};

module.exports = getReportByPeriodFromWBAPI;
