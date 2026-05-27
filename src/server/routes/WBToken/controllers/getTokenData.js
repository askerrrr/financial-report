import getTokenDetails from "../services/getTokenDetails.js";
import tokenCollectionServices from "../../../database/collections/tokens/index.js";

var getTokenData = async (req, res, next) => {
  var userId = req.params.userId;

  if (!userId) {
    return res.sendStatus(400);
  }

  var { token } = await tokenCollectionServices.getWBTokenByUserId(userId);

  if (!token.length) {
    return res.json({ tokenIsExist: false });
  }

  var tokenDetails = getTokenDetails(token);

  return res.json(tokenDetails);
};

export default getTokenData;
