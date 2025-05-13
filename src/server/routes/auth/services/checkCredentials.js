var argon2 = require("argon2");

var checkCredentials = async (userData, userDataFromDB) => {
  if (!(await argon2.verify(userDataFromDB.login, userData.login))) {
    return;
  }

  return await argon2.verify(userDataFromDB.passwd, userData.passwd);
};

module.exports = checkCredentials;
