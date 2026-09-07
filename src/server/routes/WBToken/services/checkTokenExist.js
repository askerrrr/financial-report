import parseJwt from "./utils/parseJwt.js";
import checkTokenExpiry from "./utils/checkTokenExpiry.js";
import { getWBTokenByType } from "../../../database/modelsUtil/tokens/index.js";

var checkTokenExistService = async (userId, requiredTokenType) => {
  var { token } = await getWBTokenByType(userId, requiredTokenType);

  if (!token) {
    return { tokenIsMissing: true, isExpired: false, token: "" };
  }

  var tokenPayload = parseJwt(token);

  var { isExpired } = checkTokenExpiry(tokenPayload);

  if (isExpired) {
    return { isExpired, tokenIsMissing: false, token: "" };
  }

  return { token, isExpired: false, tokenIsMissing: false };
};

export default checkTokenExistService;
