import { DatabaseError } from "../../../../customError/index.js";

var getUserByUserId = async (collection, userId) => {
  try {
    return await collection.findOne({ userId }).exec();
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default getUserByUserId;
