var jose = import("jose");
var { randomBytes } = require("node:crypto");
var { dbClient } = require("../../../database");
var checkLogin = require("../services/checkLogin");
var checkPasswd = require("../services/checkPasswd");

var alg = "RS256";
var oneDayMs = 24 * 3600 * 1000;

var createUser = async (req, res, next) => {
  var candidate = req.body;

  await checkLogin(candidate.login);
  await checkPasswd(candidate.passwd);

  var session = await dbClient.startSession();
  var { createUserToDb, getUserByLogin } = req.app.locals.userCollectionServices;

  try {
    await session.withTransaction(async () => {
      try {
        var userIsExist = await getUserByLogin(candidate.login, session);

        if (userIsExist) {
          return res.sendStatus(409);
        }

        var userId = randomBytes(10).toString("hex");
        candidate.userId = userId;
        await createUserToDb(candidate, session);

        jose = await jose;
        var payload = { userId, role: "user" };
        var privateKey = await jose.importPKCS8(process.env.pkcs8, alg);
        var token = await new jose.SignJWT(payload).setExpirationTime("1 day").setProtectedHeader({ alg }).sign(privateKey);

        return res
          .cookie("token", token, { httpOnly: true, maxAge: oneDayMs })
          .cookie("userId", userId, { httpOnly: false, maxAge: oneDayMs })
          .json({ redirectUrl: "/" });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "cannot create user" });
      }
    });
  } catch (e) {
    return res.status(500).json({ msg: "cannot create user" });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = createUser;
