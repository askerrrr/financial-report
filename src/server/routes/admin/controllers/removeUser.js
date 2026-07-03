import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";

var removeUser = async (req, res, next) => {
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      await dbUtils.userCollectionServices.deleteUserFromDb(req.body.userId, session);
      res.sendStatus(200);
    });
  } catch (e) {
    res.sendStatus(304);
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }
};

export default removeUser;
