var { DatabaseError } = require("../../../../customError");

var createReportTreeEntity = async (collection, userId) => {
  try {
    var reportingPeriodsEntity = await collection.insertOne({
      userId,
      years: [],
    });

    var result = await reportingPeriodsEntity.save();

    return result._id;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createReportTreeEntity;
