var { DatabaseError } = require("../../../../customError");

var saveUpdatedReports = async (collection, userId, reports, session) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { reports },
      },
      {
        session: session,
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = saveUpdatedReports;
