import { removeTokenFromDb } from "../../../database/modelsUtil/tokens/index.js";

var removeTokenController = async (req, res) => {
  var { userId, tokenType } = req.body;

  await removeTokenFromDb(userId, tokenType);

  return res.sendStatus(200);
};

export default removeTokenController;
