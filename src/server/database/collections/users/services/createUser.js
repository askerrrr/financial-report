var argon2 = require("argon2");
var { DatabaseError } = require("../../../../customError/");

var createUser = async (collection, userData, reportsEntityObjectId) => {
  try {
    var userId = userData.userId;
    var login = userData.login;

    var passwd = await argon2.hash(userData.passwd + "", "secret");

    var user = await collection.insertOne({ login, passwd, userId });

    var result = await user.save();

    return result == user;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createUser;
