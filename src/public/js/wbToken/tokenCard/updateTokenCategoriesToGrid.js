export var updateTokenCategoriesToGrid = (token) => {
  var tokenCategoriesGrid = document.getElementById(
    "token-categories-" + token.type,
  );

  tokenCategoriesGrid.innerHTML = "";

  for (var category of token.categories) {
    var categoryTagElem = document.createElement("span");
    categoryTagElem.textContent = category;
    categoryTagElem.className = "category-tag";

    tokenCategoriesGrid.append(categoryTagElem);
  }
};
