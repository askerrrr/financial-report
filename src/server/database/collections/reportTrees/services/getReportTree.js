var { DatabaseError } = require("../../../../customError");

var getReportTree = async (collection, userId, session) => {
  try {
    var data;

    if (session) {
      data = await collection.findOne({ userId }, null, { session: session });
    } else {
      data = await collection.findOne({ userId });
    }

    return { reportTree: data.years };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportTree;
