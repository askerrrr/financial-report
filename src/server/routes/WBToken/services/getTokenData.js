import parseJwt from "./utils/parseJwt.js";
import getTokenDetails from "./utils/getTokenDetails.js";
import { getWBTokens } from "../../../database/modelsUtil/tokens/index.js";
import getTokenCategoriesFromBitMask from "./utils/getTokenCategoriesFromBitMask.js";

var getTokenDataService = async (userId) => {
  var { tokens } = await getWBTokens(userId);

  var tokensDetails = [];

  if (!tokens.length) {
    return { tokensDetails };
  }

  for (var { token, lastUsed, addedAt, type } of tokens) {
    var tokenPayload = parseJwt(token);
    var tokenDetails = getTokenDetails(tokenPayload);
    var { categories } = getTokenCategoriesFromBitMask(tokenPayload.s);

    tokenDetails.type = type;
    tokenDetails.lastUsed = lastUsed;
    tokenDetails.categories = categories;
    tokenDetails.addedAt = addedAt.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    tokensDetails.push(tokenDetails);
  }

  return { tokensDetails };
};

export default getTokenDataService;
