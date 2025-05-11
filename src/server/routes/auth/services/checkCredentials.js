var checkCredentials = async (userData, userDataFromDB) => {
  if (userData.login !== userDataFromDB.login) {
    return;
  }

  return userData.passwd == userDataFromDB.passwd;
};

module.exports = checkCredentials;
