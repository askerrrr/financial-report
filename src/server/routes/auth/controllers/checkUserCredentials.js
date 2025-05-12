var JWT = require("jsonwebtoken");

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

  var payload = {
    role: "user",
    login: userData.login,
    userId: userData.userId,
  };

  var token = JWT.sign(payload, "secretkey", { expiresIn: "2h" });

  return res
    .cookie("token", token, { httpOny: true, maxAge: 2000 * 60 * 60 })
    .json({ redirectUrl: "/" });
};

module.exports = checkUserCredentials;
