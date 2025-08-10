var { DatabaseError } = require("../../../../customError");

var deleteAllReportsByUserId = async (collection, userId) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { reports: [] },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = deleteAllReportsByUserId;
