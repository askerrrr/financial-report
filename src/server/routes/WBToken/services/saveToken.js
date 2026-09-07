import { dbClient } from "../../../database/index.js";
import getTokenDetails from "./utils/getTokenDetails.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var { getWBTokenByUserId, saveWBTokenToDb } = dbUtils.tokenModelUtils;

var saveTokenService = async (userId, newToken, tokenPayload) => {
  var session = await dbClient.startSession();

  return await session.withTransaction(async () => {
    var tokenDetails = null;
    var isEqualToken = false;

    var { token } = await getWBTokenByUserId(userId, session);

    if (newToken === token) {
      isEqualToken = true;
      return { isEqualToken, tokenDetails };
    }

    await saveWBTokenToDb(userId, newToken, session);

    tokenDetails = getTokenDetails(tokenPayload);

    tokenDetails.lastUsed = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    return { isEqualToken, tokenDetails };
  });
};

export default saveTokenService;
