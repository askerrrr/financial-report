var { DatabaseError } = require("../../../customError/customError");

var createReport = async (collection, userId, report) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $push: {
          reports: { $each: [report], $position: 0 },
        },
      }
    );

    return result.acknowledged;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createReport;
