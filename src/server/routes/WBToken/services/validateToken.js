import parseJwt from "./utils/parseJwt.js";
import isTestToken from "./utils/isTestToken.js";
import checkTokenExpiry from "./utils/checkTokenExpiry.js";
import checkTokenPayload from "./utils/checkTokenPayload.js";
import isPresumablyJwtToken from "./utils/isPresumablyJwtToken.js";
import getTokenTypeByCategories from "./utils/getTokenTypeByCategories.js";
import getTokenCategoriesFromBitMask from "./utils/getTokenCategoriesFromBitMask.js";
import findMissingCategoriesByTokenType from "./utils/findMissingCategoriesByTokenType.js";

var validateTokenService = async (token) => {
  if (!isPresumablyJwtToken(token)) {
    return {
      errorText: "Переданное значение не является JWT-токеном",
      tokenPayload: {},
      type: "",
      categories: [],
    };
  }

  var tokenPayload = parseJwt(token);

  var { payloadIsInvalid } = checkTokenPayload(tokenPayload);

  if (payloadIsInvalid) {
    return {
      errorText: "Содержимое токена недействительно",
      tokenPayload: {},
      type: "",
      categories: [],
    };
  }

  if (isTestToken(tokenPayload)) {
    return {
      errorText: "Тестовый токен не поддерживается",
      tokenPayload: {},
      type: "",
      categories: [],
    };
  }

  var { isExpired } = checkTokenExpiry(tokenPayload);

  if (isExpired) {
    return {
      errorText: "Срок действия токена истёк",
      tokenPayload: {},
      type: "",
      categories: [],
    };
  }

  var bitmask = tokenPayload.s;
  var { categories } = getTokenCategoriesFromBitMask(bitmask);

  var { type } = getTokenTypeByCategories(categories);

  var { missingCategories } = findMissingCategoriesByTokenType(
    type,
    categories,
  );

  if (missingCategories.length) {
    return {
      errorText: `В токене отсутствуют категории: ${missingCategories.join(", ")}`,
      tokenPayload: {},
      type: "",
      categories: [],
    };
  }

  return { errorText: "", tokenPayload, type, categories };
};

export default validateTokenService;
