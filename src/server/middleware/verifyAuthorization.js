var verifyAuthorization = (req, res, next) => {
  var { payload } = req;

  if (!payload?.role) {
    res.clearCookie("token");
    return res.sendFile(join(__dirname, "../../public/html/decodeReportWithoutRegistration/index.html"));
  }

  if (payload.role == "user") {
    req.app.locals.userId = payload.userId;
    return next();
  }

  res.clearCookie("token");
  return res.sendStatus(403);
};

module.exports = verifyAuthorization;
