var argon2 = require("argon2");

var createUser = async (collection, userData) => {
  try {
    var userId = userData.userId;
    var login = await argon2.hash(userData.login, "secret");
    var passwd = await argon2.hash(userData.passwd, "secret");

    var user = await collection.insertOne({ login, passwd, userId });

    var result = await user.save();

    return result == user;
  } catch (e) {}
};

module.exports = createUser;
