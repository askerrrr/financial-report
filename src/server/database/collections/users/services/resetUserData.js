import { dbClient } from "../../../index.js";

var resetUserData = async (userId) => {
  var success = true;
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {});
  } catch {
    success = false;
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }

  return { success };
};

export default resetUserData;
