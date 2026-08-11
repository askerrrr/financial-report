import { DatabaseError } from "../../../../customError/index.js";

var deleteReportTreeByUserId = async (collection, userId) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { years: [] },
      },
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default deleteReportTreeByUserId;
