import { dbClient } from "../../../database/index.js";
import getTokenDetails from "./utils/getTokenDetails.js";
import dbUtils from "../../../database/modelsUtil/index.js";
import getTokenTypeByCategories from "./utils/getTokenTypeByCategories.js";
import getTokenCategoriesFromBitMask from "./utils/getTokenCategoriesFromBitMask.js";

var { getWBTokens, saveWBTokenToDb } = dbUtils.tokenModelUtils;

var saveTokenService = async (userId, newToken, tokenPayload) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var tokenDetails = null;
    var isEqualToken = false;

    var { tokens } = await getWBTokens(userId, session);

    var currentToken = tokens.find((item) => item.token === newToken)?.token;

    if (newToken === currentToken) {
      isEqualToken = true;
      return { isEqualToken, tokenDetails };
    }

    var bitmask = tokenPayload.s;
    var { tokenCategories } = getTokenCategoriesFromBitMask(bitmask);
    var { type } = getTokenTypeByCategories(tokenCategories);

    await saveWBTokenToDb(userId, newToken, type, bitmask, session);

    tokenDetails = getTokenDetails(tokenPayload);

    tokenDetails.lastUsed = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    return { isEqualToken, tokenDetails };
  });
};

export default saveTokenService;
