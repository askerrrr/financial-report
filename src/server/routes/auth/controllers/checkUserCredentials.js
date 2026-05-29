var jose = import("jose");
import dbUtils from "../../../database/collections/index.js";
import checkCredentials from "../services/checkCredentials.js";

var alg = "RS256";
var oneDayMs = 24 * 3600 * 1000;

var checkUserCredentials = async (req, res, next) => {
  var { getUserByLogin } = dbUtils.userCollectionServices;

  var existUser = await getUserByLogin(req.body.login);

  if (!existUser) {
    return res.sendStatus(404);
  }

  var success = await checkCredentials(req.body, existUser);

  if (!success) {
    return res.sendStatus(401);
  }

  jose = await jose;
  var payload = { role: "user", userId: existUser.userId };
  var privateKey = await jose.importPKCS8(process.env.pkcs8, alg);
  var token = await new jose.SignJWT(payload).setExpirationTime("1 day").setProtectedHeader({ alg }).sign(privateKey, {});

  var userId = existUser.userId;

  return res
    .cookie("token", token, { httpOnly: true, maxAge: oneDayMs })
    .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
    .json({ redirectUrl: "/" });
};

export default checkUserCredentials;
