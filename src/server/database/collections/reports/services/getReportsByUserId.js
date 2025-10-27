var { DatabaseError } = require("../../../../customError");

var getReportsByUserId = async (collection, userId, projectQuery) => {
  try {
    if (projectQuery) {
      var { reports } = await collection.findOne({ userId }).select(projectQuery);

      return { reports };
    }

    var { reports } = await collection.findOne({ userId });

    return { reports };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsByUserId;
