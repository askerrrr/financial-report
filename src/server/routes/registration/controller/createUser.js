var env = require("../../../env");
var JWT = require("jsonwebtoken");
var { randomBytes } = require("node:crypto");
var createUserReportPhotosFolder = require("../services/createUserReportPhotosFolder");

var createUser = async (req, res, next) => {
  var { createReportsEntity } = req.app.locals.reportCollectionServices;
  var { createTaxParamsEntity } = req.app.locals.taxParamsCollectionServices;
  var { createUserToDb, getUserByLogin } = req.app.locals.userCollectionServices;
  var { createTokenCollectionEntity } = req.app.locals.tokenCollectionServices;
  var { createReportsTreeEntity } = req.app.locals.reportsTreeCollectionServices;

  var user = req.body;

  var userIsExist = await getUserByLogin(user.login);

  if (userIsExist) {
    return res.sendStatus(409);
  }

  var userId = randomBytes(10).toString("hex");

  await createReportsEntity(userId);
  await createTaxParamsEntity(userId);
  await createReportsTreeEntity(userId);
  await createTokenCollectionEntity(userId);
  await createUserReportPhotosFolder(userId);

  user.userId = userId;

  var success = await createUserToDb(user);

  if (!success) {
    return res.status(500).json({ msg: "cannot create user" });
  }

  var payload = { userId, role: "user" };

  var token = JWT.sign(payload, env.secretKey, { expiresIn: "2h" });

  return res
    .cookie("token", token, { httpOnly: true, maxAge: 2000 * 60 * 60 })
    .cookie("userId", userId, { httpOnly: false, maxAge: 2000 * 60 * 60 })
    .json({ redirectUrl: "/" });
};

module.exports = createUser;
