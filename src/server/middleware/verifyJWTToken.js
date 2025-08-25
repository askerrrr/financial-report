var env = require("../env");
var JWT = require("jsonwebtoken");
var { join } = require("node:path");

var verifyJWTToken = async (req, res, next) => {
  try {
    var token = req.cookies?.token;

    if (!token) {
      return res.sendFile(join(__dirname, "../../public/html/decodeReportWithoutRegistration/index.html"));
    }

    var user = JWT.verify(token, env.secretKey);

    if (user.role == "user") {
      req.app.locals.userId = user.userId;

      return next();
    }

    return next();
  } catch (e) {
    res.clearCookie("token");
    next(e);
  }
};

module.exports = verifyJWTToken;
