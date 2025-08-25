var { DatabaseError } = require("../../../../customError");

var createReportsEntity = async (collection, userId) => {
  try {
    var reportsEntity = await collection.insertOne({ userId });

    var result = await reportsEntity.save();

    return result._id;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createReportsEntity;
