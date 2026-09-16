import parseJwt from "./utils/parseJwt.js";
import getTokenDetails from "./utils/getTokenDetails.js";
import { getWBTokens } from "../../../database/modelsUtil/tokens/index.js";

var getTokenDataService = async (userId) => {
  var { tokens } = await getWBTokens(userId);

  var tokensDetails = [];

  if (!tokens.length) {
    return { tokensDetails };
  }

  for (var { token, lastUsed, addedAt, type } of tokens) {
    var tokenPayload = parseJwt(token);
    var tokenDetails = getTokenDetails(tokenPayload);

    tokenDetails.type = type;
    tokenDetails.lastUsed = lastUsed;
    tokenDetails.addedAt = addedAt.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    tokensDetails.push(tokenDetails);
  }

  return { tokensDetails };
};

export default getTokenDataService;
