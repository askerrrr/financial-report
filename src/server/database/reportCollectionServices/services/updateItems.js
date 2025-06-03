var { DatabaseError } = require("../../../customError/customError");

var updateItems = async (collection, userId, reportId, items) => {
  try {
    var result = await collection.updateOne(
      { userId, "reports.reportId": reportId },
      {
        $set: {
          "reports.$.items": items,
        },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateItems;
