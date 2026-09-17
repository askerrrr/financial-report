var requiredReadWriteCategory = "Цены и скидки";
var requiredReadCategories = [
  "Финансы",
  "Аналитика",
  "Продвижение",
  "Цены и скидки",
];

var findMissingCategoriesByTokenType = (tokenType, categoriesFromToken) => {
  var missingCategories = [];

  if (tokenType === "read") {
    for (var cat of requiredReadCategories) {
      if (!categoriesFromToken.includes(cat)) {
        missingCategories.push(cat);
      }
    }
  } else {
    if (!categoriesFromToken.includes(requiredReadWriteCategory)) {
      missingCategories.push(requiredReadWriteCategory);
    }
  }

  return { missingCategories };
};

export default findMissingCategoriesByTokenType;
