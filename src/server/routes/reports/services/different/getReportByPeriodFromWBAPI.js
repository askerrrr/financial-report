var { WBAPIError } = require("../../../../customError/");

var getReportByPeriodFromWBAPI = async (dateFrom, dateTo, token, userId) => {
  var url = `https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod?dateFrom=${dateFrom}&dateTo=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    var errMsg = "Возникла ошибка при получении финансового отчета";

    throw new WBAPIError(userId, res.status, res.statusText, errMsg);
  }

  var report = await res.json();

  return report;
};

module.exports = getReportByPeriodFromWBAPI;
