import { DatabaseError } from "../../../../customError/index.js";

var saveWBTokenToDb = async (collection, userId, token, session) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { token },
      },
      {
        session: session,
      },
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default saveWBTokenToDb;
