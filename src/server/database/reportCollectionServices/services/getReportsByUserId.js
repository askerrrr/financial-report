var { DatabaseError } = require("../../../customError/customError");

var getReportsByUserId = async (collection, userId) => {
  try {
    var user = await collection.findOne({ userId });

    var reports = user?.reports || [];

    return reports;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsByUserId;
