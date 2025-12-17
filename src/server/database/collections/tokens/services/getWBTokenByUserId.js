var { DatabaseError } = require("../../../../customError");

var getWBTokenByUserId = async (collection, userId, session) => {
  try {
    var data;
    if (session) {
      data = await collection.findOne({ userId }, null, { session: session });
    } else {
      data = await collection.findOne({ userId });
    }
    return { token: data.token };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getWBTokenByUserId;
