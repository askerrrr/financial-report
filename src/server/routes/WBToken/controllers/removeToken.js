import tokenCollectionServices from "../../../database/collections/tokens/index.js";

var removeToken = async (req, res) => {
  var { userId } = req.body;

  var success = await tokenCollectionServices.removeTokenFromDb(userId);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default removeToken;
