var { DatabaseError } = require("../../../../customError");

var getWBTokenByUserId = async (collection, userId) => {
  try {
    var user = await collection.findOne({ userId });

    return user.token;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getWBTokenByUserId;
