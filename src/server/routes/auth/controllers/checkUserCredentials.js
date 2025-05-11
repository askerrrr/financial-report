var checkCredentials = require("../services/checkCredentials");

var checkUserCredentials = async (req, res, next) => {
  var { getUser } = req.app.locals.userCollectionServices();

  var userData = req.body;

  var userDataFromDB = await getUser(userData.login);

  if (!userDataFromDB) {
    return res.sendStatus(404);
  }

  var successAuth = await checkCredentials(userData, userDataFromDB);

  if (!successAuth) {
    return res.sendStatus(403);
  }

  return res.status(200).json({ redirectUrl: "/" });
};

module.exports = checkUserCredentials;
