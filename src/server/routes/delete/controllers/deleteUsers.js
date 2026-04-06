import { dbClient } from "../../../database/index.js";

var deleteUsers = async (req, res, next) => {
  var { deleteUsersFromDb } = req.app.locals.userCollectionServices;
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      await deleteUsersFromDb(session);
      return res.sendStatus(200);
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default deleteUsers;
