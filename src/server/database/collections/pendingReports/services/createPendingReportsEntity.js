const { DatabaseError } = require("../../../../customError");

var createPendingReportsEntity = async (collection, userId) => {
  try {
    await collection.insertOne({ userId });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createPendingReportsEntity;
