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

var allowedBitValue = 1;

var getTokenCategoriesFromBitMask = (bitmask) => {
  var bitsArr = bitmask.toString(2).split("").reverse().map(Number);

  var bitPos = 0;
  var tokenCategories = [];

  while (bitPos < bitsArr.length) {
    var categoryIsAllowed = bitsArr[bitPos] === allowedBitValue;

    if (categoryIsAllowed) {
      var category = categoryMap[bitPos];

      if (category) {
        tokenCategories.push(category);
      }
    }

    ++bitPos;
  }

  return { tokenCategories };
};

export default getTokenCategoriesFromBitMask;
