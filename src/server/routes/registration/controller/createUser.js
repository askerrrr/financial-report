var jose = import("jose");
var { randomBytes } = require("node:crypto");
var checkLogin = require("../services/checkLogin");
var checkPasswd = require("../services/checkPasswd");

var alg = "RS256";
var oneDayMs = 24 * 3600 * 1000;

var createUser = async (req, res, next) => {
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
  await createReportsEntity(userId);
  await createTaxParamsEntity(userId);
  await createReportTreeEntity(userId);
  await createTokenCollectionEntity(userId);
  await createListGoodsCollectionEntity(userId);
  await createReportsLoadingStatesCollectionEntity(userId);
  await createWeeklyPricesAndDiscountsCollectionEntity(userId);

  user.userId = userId;

  var success = await createUserToDb(user);

  if (!success) {
    return res.status(500).json({ msg: "cannot create user" });
  }
  jose = await jose;
  var payload = { userId, role: "user" };
  var privateKey = await jose.importPKCS8(process.env.pkcs8, alg);
  var token = await new jose.SignJWT(payload).setExpirationTime("1 day").setProtectedHeader({ alg }).sign(privateKey, {});

  return res
    .cookie("token", token, { httpOnly: true, maxAge: oneDayMs })
    .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
    .json({ redirectUrl: "/" });
};

module.exports = createUser;
