import getTokenDataService from "../services/getTokenData.js";

var getTokenDataController = async (req, res, next) => {
  var { userId } = req.params;

  var { tokensIsExist, tokensDetails } = await getTokenDataService(userId);

  return res.json({ tokensIsExist, tokensDetails });
};

export default getTokenDataController;
