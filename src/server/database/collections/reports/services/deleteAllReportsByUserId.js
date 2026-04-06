import { DatabaseError } from "../../../../customError/index.js";
var deleteAllReportsByUserId = async (collection, userId) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { reports: [] },
      },
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default deleteAllReportsByUserId;
