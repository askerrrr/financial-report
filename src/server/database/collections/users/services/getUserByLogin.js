var { DatabaseError } = require("../../../../customError");

var getUserByLogin = async (collection, login) => {
  try {
    return await collection.findOne({ login }).exec();
  } catch (e) {
    throw new DatabaseError(login, e);
  }
};

module.exports = getUserByLogin;
