var verifyAuthorization = (req, res, next) => {
  try {
    var { payload } = req;

    if (!payload?.role) {
      return res.sendFile(join(__dirname, "../../public/html/decodeReportWithoutRegistration/index.html"));
    }

    if (payload.role == "user") {
      req.app.locals.userId = payload.userId;
      return next();
    }

    return next({ status: 403 });
  } catch (e) {}
};

module.exports = verifyAuthorization;
