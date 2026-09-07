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

var getTokenCategories = (bitmask) => {
  var bitArr = bitmask.toString(2).split("").map(Number);

  var tokenCategories = [];

  for (var i = 1; i <= bitArr.length; i++) {
    var category = categoryMap[i];

    if (typeof category === "string") {
      tokenCategories.push(category);
    }
  }

  return { tokenCategories };
};

export default getTokenCategories;
