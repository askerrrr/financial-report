var { DatabaseError } = require("../../../../customError/");

var getUserByUserId = async (collection, userId) => {
  try {
    return await collection.findOne({ userId }).exec();
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getUserByUserId;
