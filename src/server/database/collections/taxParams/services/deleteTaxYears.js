var { DatabaseError } = require("../../../../customError");

var deleteTaxYears = async (collection, userId) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { years: [] },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = deleteTaxYears;
