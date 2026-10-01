import { WBAPIError } from "../../../../../../customError/index.js";

var promoTitleStartsWith = "Тест";
var unusedPromoName = "Распродажа в счет долга";
var WBAPIUnavailableMsg =
  "Сервис Wildberries API временно недоступен. Попробуйте позже.";

var getPromotionList = async (
  token,
  startDateTime,
  endDateTime,
  allPromo = true,
) => {
  var url = `https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions?startDateTime=${startDateTime}&endDateTime=${endDateTime}&allPromo=${allPromo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).catch(() => {
    throw new WBAPIError(userId, 500, WBAPIUnavailableMsg);
  });

  if (res.status === 200) {
    var { data } = await res.json();
    var promotionList = data.promotions.filter(
      (promo) =>
        promo.name !== unusedPromoName &&
        !promo.name.startsWith(promoTitleStartsWith),
    );
    return { promotionList, errorText: "" };
  } else {
    var { errorText } = await res.json();
    return { promotionList: [], errorText };
  }
};

export default getPromotionList;
