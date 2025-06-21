var { DatabaseError } = require("../../../customError/customError");

var createReportingPeriodsEntity = async (collection, userId) => {
  try {
    var reportingPeriodsEntity = await collection.insertOne({ userId });

    var result = await reportingPeriodsEntity.save();

    return result._id;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createReportingPeriodsEntity;
