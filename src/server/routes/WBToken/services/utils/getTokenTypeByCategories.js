var readOnly = "Токен только на чтение";

var getTokenTypeByCategories = (tokenCategories) => {
  var type = tokenCategories.includes(readOnly) ? "read" : "set";
  return { type };
};

export default getTokenTypeByCategories;
