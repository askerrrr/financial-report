var env = require("../../../env");
var JWT = require("jsonwebtoken");

var checkCredentials = require("../services/checkCredentials");

var checkUserCredentials = async (req, res, next) => {
  var { getUserByLogin } = req.app.locals.userCollectionServices;

  var userData = req.body;

  var userDataFromDB = await getUserByLogin(userData.login);

  if (!userDataFromDB) {
    return res.sendStatus(404);
  }

  var successAuth = await checkCredentials(userData, userDataFromDB);

  if (!successAuth) {
    return res.sendStatus(403);
  }

  var payload = { role: "user", userId: userDataFromDB.userId };

  var token = JWT.sign(payload, env.secretKey, { expiresIn: "2h" });

  var userId = userDataFromDB.userId;

  return res
    .cookie("token", token, { httpOnly: true, maxAge: 2000 * 60 * 60 })
    .cookie("userId", userId, { httpOnly: false, maxAge: 2000 * 60 * 60 })
    .json({ redirectUrl: "/" });
};

module.exports = checkUserCredentials;
