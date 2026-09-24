var categoryMap = {
  1: "Контент",
  2: "Аналитика",
  3: "Цены и скидки",
  4: "Маркетплейс",
  5: "Статистика",
  6: "Продвижение",
  7: "Вопросы и отзывы",
  9: "Чат с покупателями",
  10: "Поставки",
  11: "Возвраты покупателями",
  12: "Документы",
  13: "Финансы",
  16: "Пользователи",
  30: "Токен только на чтение",
};

var allowedBit = "1";

var getTokenCategoriesFromBitMask = (bitmask) => {
  var bitsStr = bitmask.toString(2);

  var categories = [];
  var pos = bitsStr.length - 1;

  while (pos >= 0) {
    var bit = bitsStr[bitsStr.length - 1 - pos];

    if (bit === allowedBit) {
      var category = categoryMap[pos];

      categories.push(category);
    }

    --pos;
  }

  return { categories };
};

export default getTokenCategoriesFromBitMask;
