import { dbClient } from "../../../database/index.js";
import getTokenDetails from "./utils/getTokenDetails.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var { getWBTokens, saveWBTokenToDb } = dbUtils.tokenModelUtils;

var saveTokenService = async (
  userId,
  newToken,
  tokenPayload,
  type,
  categories,
) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var tokenDetails = null;
    var isEqualToken = false;

    var { tokens } = await getWBTokens(userId, session);
    console.log(tokens);
    var currentToken = tokens.find((item) => item.token === newToken)?.token;
    console.log({ type, currentToken });
    if (newToken === currentToken) {
      isEqualToken = true;
      return { isEqualToken, tokenDetails };
    }

    var { addedAt } = await saveWBTokenToDb(userId, newToken, type, session);

    tokenDetails = getTokenDetails(tokenPayload);
    tokenDetails.categories = categories;

    tokenDetails.type = type;

    tokenDetails.addedAt = new Date(addedAt).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    return { isEqualToken, tokenDetails };
  });
};

export default saveTokenService;
