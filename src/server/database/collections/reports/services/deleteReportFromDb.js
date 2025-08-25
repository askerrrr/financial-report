var { DatabaseError } = require("../../../../customError");

var deleteReportFromDb = async (collection, userId, reportId) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $pull: { reports: { reportId } },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = deleteReportFromDb;
