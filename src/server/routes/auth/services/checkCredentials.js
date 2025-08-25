var argon2 = require("argon2");

var checkCredentials = async (userData, userDataFromDB) => {
  if (userDataFromDB.login !== userData.login) {
    return;
  }

  return await argon2.verify(userDataFromDB.passwd, userData.passwd);
};

module.exports = checkCredentials;
