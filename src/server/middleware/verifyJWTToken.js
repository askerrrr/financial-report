var jose = require("jose");
var { join } = require("node:path");

var alg = "RS256";

var verifyJWTToken = async (req, res, next) => {
  try {
    var token = req.cookies?.token;

    if (!token) {
      return res.sendFile(join(__dirname, "../../public/html/decodeReportWithoutRegistration/index.html"));
    }

    var publicKey = await jose.importSPKI(process.env.spki, alg);
    var { payload, protectedHeader } = await jose.jwtVerify(token, publicKey);

    if (payload.role == "user") {
      req.app.locals.userId = payload.userId;

      return next();
    }

    return next({ status: 403 });
  } catch (e) {
    res.clearCookie("token");
    next(e);
  }
};

module.exports = verifyJWTToken;
