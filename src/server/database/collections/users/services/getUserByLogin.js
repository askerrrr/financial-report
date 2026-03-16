var { DatabaseError } = require("../../../../customError");

var getUserByLogin = async (collection, login, session) => {
  var sessionOpt = session ? { session } : {};

  try {
    return await collection.findOne({ login }, sessionOpt).exec();
  } catch (e) {
    throw new DatabaseError(login, e);
  }
};

module.exports = getUserByLogin;
