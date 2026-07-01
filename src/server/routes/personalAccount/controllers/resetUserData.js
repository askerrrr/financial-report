import dbUtils from "../../../database/collections/index.js";

var resetUserData = async (req, res) => {
  var { success } = await dbUtils.userCollectionServices.resetUserData(req.body.userId);

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default resetUserData;
