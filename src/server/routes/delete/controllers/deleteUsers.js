import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/modelsUtil/index.js";

var { deleteUsersFromDb } = dbUtils.userModelUtils;

var deleteUsersController = async (req, res, next) => {
  var session = await dbClient.startSession();

  await session.withTransaction(async () => {
    await deleteUsersFromDb(session);
    return res.sendStatus(200);
  });
};

export default deleteUsersController;
