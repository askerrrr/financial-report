import { DatabaseError } from "../../../../customError/index.js";

var updateReportsTree = async (collection, userId, years) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { years: years },
      },
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};
export default updateReportsTree;
