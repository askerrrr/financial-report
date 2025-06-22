var JWT = require("jsonwebtoken");
var { randomBytes } = require("node:crypto");
var createUserReportPhotosFolder = require("../services/createUserReportPhotosFolder");

var createUser = async (req, res, next) => {
  var { createUser, getUserByLogin } = req.app.locals.userCollectionServices;
  var { createReportsEntity } = req.app.locals.reportCollectionServices;
  var { createTokenCollectionEntity } = req.app.locals.tokenCollectionServices;
  var { createReportingPeriodsEntity } =
    req.app.locals.reportingPeriodsCollectionServices;

  var userData = req.body;

  var user = await getUserByLogin(userData.login);

  if (user) {
    return res.sendStatus(409);
  }

  var userId = randomBytes(10).toString("hex");

  userData.userId = userId;

  var reportsEntityObjectId = await createReportsEntity(userId);

  await createTokenCollectionEntity(userId);
  await createUserReportPhotosFolder(userId);
  await createReportingPeriodsEntity(userId);

  var successCreate = await createUser(userData, reportsEntityObjectId);

  if (!successCreate) {
    return res.status(500).json({ msg: "cannot create user" });
  }

  var payload = { userId, role: "user" };

  var token = JWT.sign(payload, "secretkey", { expiresIn: "2h" });

  return res
    .cookie("token", token, { httpOnly: true, maxAge: 2000 * 60 * 60 })
    .cookie("userId", userId, { httpOnly: false, maxAge: 2000 * 60 * 60 })
    .json({ redirectUrl: "/" });
};

module.exports = createUser;
