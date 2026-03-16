var Joi = require("joi");
var jose = import("jose");
var checkCredentials = require("../services/checkCredentials");

var alg = "RS256";
var oneDayMs = 24 * 3600 * 1000;
var schema = Joi.object({ login: Joi.string().required(), passwd: Joi.string().required() });

var checkUserCredentials = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { getUserByLogin } = req.app.locals.userCollectionServices;

  var existUser = await getUserByLogin(req.body.login);

  if (!existUser) {
    return res.sendStatus(404);
  }

  var success = await checkCredentials(req.body, existUser);

  if (!success) {
    return res.sendStatus(403);
  }

  var payload = { role: "user", userId: existUser.userId };
  var privateKey = await jose.importPKCS8(process.env.pkcs8, alg);
  var token = await new jose.SignJWT(payload).setExpirationTime("1 day").setProtectedHeader({ alg }).sign(privateKey, {});

  var userId = existUser.userId;

  return res
    .cookie("token", token, { httpOnly: true, maxAge: oneDayMs })
    .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
    .json({ redirectUrl: "/" });
};

module.exports = checkUserCredentials;
