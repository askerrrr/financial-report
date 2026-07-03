import dbUtils from "../../../database/collections/index.js";

var getAdminMainPageData = async (req, res, next) => {
  var { getAllUsersFromDb } = dbUtils.userCollectionServices;

  var users = await getAllUsersFromDb();
  return res.json(users);
};

export default getAdminMainPageData;
