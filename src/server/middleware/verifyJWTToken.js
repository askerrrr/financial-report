var { join } = require("node:path");
var JWT = require("jsonwebtoken");

var verifyJWTToken = async (req, res, next) => {
  try {
    var token = req.cookies?.token;

    if (!token) {
      return res.sendFile(
        join(__dirname, "../../public/html/auth/authForm.html")
      );
    }

    var user = JWT.verify(token, "secretkey");

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
