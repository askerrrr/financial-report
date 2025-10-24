var { DatabaseError } = require("../../../../customError");

var saveWBTokenToDb = async (collection, userId, token) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { token },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = saveWBTokenToDb;
