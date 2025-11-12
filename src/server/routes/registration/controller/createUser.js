var JWT = require("jsonwebtoken");
var { randomBytes } = require("node:crypto");
var checkLogin = require("../services/checkLogin");
var checkPasswd = require("../services/checkPasswd");
var createUserReportPhotosFolder = require("../services/createUserReportPhotosFolder");

var createUser = async (req, res, next) => {
  var { createSKUsEntity } = req.app.locals.skusCollectionServices;
  var { createReportsEntity } = req.app.locals.reportCollectionServices;
  var { createTaxParamsEntity } = req.app.locals.taxParamsCollectionServices;
  var { createUserToDb, getUserByLogin } = req.app.locals.userCollectionServices;
  var { createTokenCollectionEntity } = req.app.locals.tokenCollectionServices;
  var { createReportTreeEntity } = req.app.locals.reportsTreeCollectionServices;
  var { createListGoodsCollectionEntity } = req.app.locals.goodsCollectionServices;
  var { createReportsLoadingStatesCollectionEntity } = req.app.locals.reportLoadingStatesCollectionServices;
  var { createWeeklyPricesAndDiscountsCollectionEntity } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;
  var user = req.body;

  await checkLogin(user.login);
  await checkPasswd(user.passwd);

  var userIsExist = await getUserByLogin(user.login);

  if (userIsExist) {
    return res.sendStatus(409);
  }

  var userId = randomBytes(10).toString("hex");
  await createSKUsEntity(userId);
  await createReportsEntity(userId);
  await createTaxParamsEntity(userId);
  await createReportTreeEntity(userId);
  await createTokenCollectionEntity(userId);
  await createUserReportPhotosFolder(userId);
  await createListGoodsCollectionEntity(userId);
  await createReportsLoadingStatesCollectionEntity(userId);
  await createWeeklyPricesAndDiscountsCollectionEntity(userId);

  user.userId = userId;

  var success = await createUserToDb(user);

  if (!success) {
    return res.status(500).json({ msg: "cannot create user" });
  }

  var payload = { userId, role: "user" };

  var token = JWT.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h" });

  return res
    .cookie("token", token, { httpOnly: true, maxAge: 2000 * 60 * 60 })
    .cookie("userId", userId, { httpOnly: false, maxAge: 2000 * 60 * 60 })
    .json({ redirectUrl: "/" });
};

module.exports = createUser;
