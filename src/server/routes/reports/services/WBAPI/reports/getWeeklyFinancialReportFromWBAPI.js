import { WBAPIError } from "../../../../../customError/index.js";

var requriedFields = [
  "nmId",
  "rrdId",
  "forPay",
  "dateTo",
  "saleDt",
  "quantity",
  "reportId",
  "penalty",
  "dateFrom",
  "vendorCode",
  "deduction",
  "reportType",
  "paidStorage",
  "retailPrice",
  "docTypeName",
  "retailAmount",
  "deliveryService",
  "paidAcceptance",
  "additionalPayment",
];

var getWeeklyFinancialReportFromWBAPI = async (dateFrom, dateTo, token, userId) => {
  var url = "https://finance-api.wildberries.ru/api/finance/v1/sales-reports/detailed";

  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo, fields: requriedFields }),
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
  });

  if (res.status === 200) {
    var report = await res.json();

    return report;
  } else if (res.status === 204) {
    return [];
  }

  var errMsg;

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос";
      break;
    case 401:
      errMsg = "Не удалось авторизоваться с помощью сохраненного токена";
      break;
    case 429:
      errMsg = "Подождите минуту перед получением нового отчёта";
      break;
    case 402:
      errMsg = "Требуется платеж";
      break;
    default:
      errMsg = "Возникла ошибка при получении финансового отчета, попробуйте позже";
  }

  throw new WBAPIError(userId, res.status, errMsg);
};

export default getWeeklyFinancialReportFromWBAPI;
