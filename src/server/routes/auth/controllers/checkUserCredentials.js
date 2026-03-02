var Joi = require("joi");
var JWT = require("jsonwebtoken");
var checkCredentials = require("../services/checkCredentials");

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

  var token = JWT.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h" });

  var userId = existUser.userId;

  return res
    .cookie("token", token, { httpOnly: true, maxAge: 2000 * 60 * 60 })
    .cookie("userId", userId, { httpOnly: false, maxAge: 2000 * 60 * 60 })
    .json({ redirectUrl: "/" });
};

module.exports = checkUserCredentials;
