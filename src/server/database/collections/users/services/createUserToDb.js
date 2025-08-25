var argon2 = require("argon2");
var { DatabaseError } = require("../../../../customError");

var createUserToDb = async (collection, { userId, login, passwd }) => {
  try {
    passwd = await argon2.hash(passwd + "", "youSecretKey");

    var newUser = await collection.insertOne({ login, passwd, userId });

    var result = await newUser.save();

    return result == newUser;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createUserToDb;
