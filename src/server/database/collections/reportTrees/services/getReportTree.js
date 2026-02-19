var { DatabaseError } = require("../../../../customError");

var getReportTree = async (collection, userId, session) => {
  try {
    var sessionOpt = session ? { session: session } : {};
    var data = await collection.findOne({ userId }, null, { ...sessionOpt });

    return { reportTree: data.years };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportTree;
