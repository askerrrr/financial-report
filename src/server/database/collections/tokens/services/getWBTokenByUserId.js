var { DatabaseError } = require("../../../../customError");

var getWBTokenByUserId = async (collection, userId, session) => {
  try {
    var sessionOpt = session ? { session: session } : {};
    var data = await collection.findOne({ userId }, null, { ...sessionOpt });

    return { token: data.token };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getWBTokenByUserId;
