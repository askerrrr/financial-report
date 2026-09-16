import getTokenDataService from "../services/getTokenData.js";

var getTokenDataController = async (req, res, next) => {
  var { userId } = req.params;

  var { tokensDetails } = await getTokenDataService(userId);

  return res.json({ tokensDetails });
};

export default getTokenDataController;
