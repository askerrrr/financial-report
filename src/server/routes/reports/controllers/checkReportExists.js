var checkReportExists = async (req, res, next) => {
  var { dateFrom, dateTo, userId } = req.body;
  var { checkReportExistsToDb } = req.app.locals.reportCollectionServices;

  var isReportExists = await checkReportExistsToDb(userId, dateFrom, dateTo);

  if (isReportExists) {
    return res.status(409).json({ msg: "Отчет за данный период уже существует.\nЧтобы загрузить отчет еще раз, необходимо его удалить." });
  }

  req.body.userId = userId;
  next();
};

module.exports = checkReportExists;
