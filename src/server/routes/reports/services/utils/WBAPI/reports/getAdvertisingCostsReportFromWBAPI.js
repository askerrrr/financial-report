import { WBAPIError } from "../../../../../../customError/index.js";

var WBAPIUnavailableMsg =
  "Сервис Wildberries API временно недоступен. Попробуйте позже.";

var getAdvertisingCostsReportFromWBAPI = async (
  dateFrom,
  dateTo,
  token,
  userId,
) => {
  var url = `https://advert-api.wildberries.ru/adv/v1/upd?from=${dateFrom}&to=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  }).catch(() => {
    throw new WBAPIError(userId, 500, WBAPIUnavailableMsg);
  });

  if (res.status === 200) {
    var advertisingReport = await res.json();
    return advertisingReport;
  }

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос";
      break;
    case 401:
      errMsg =
        "Не удалось авторизоваться для получения отчета о затратах на рекламу с помощью сохраненного токена. Получить токен с нужными правами можно получить в личном кабинете продавца";
      break;
    case 429:
      errMsg = "Подождите минуту перед получением нового отчёта";
      break;
    default:
      errMsg =
        "Возникла ошибка при получении истории затрат на рекламу, попробуйте позже";
  }

  throw new WBAPIError(userId, res.status, errMsg);
};

export default getAdvertisingCostsReportFromWBAPI;
