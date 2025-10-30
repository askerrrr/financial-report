var { DatabaseError } = require("../../../../customError");

var deleteReportFromDb = async (collection, userId, reportId, session) => {
  try {
    var result;

    if (session) {
      result = await collection.updateOne(
        { userId },
        {
          $pull: { reports: { reportId } },
        },
        { session }
      );
    } else {
      result = await collection.updateOne(
        { userId },
        {
          $pull: { reports: { reportId } },
        }
      );
    }

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = deleteReportFromDb;
