var checkReportExists = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { dateFrom, dateTo } = req.params;
  var { checkReportExistsToDb } = req.app.locals.reportCollectionServices;

  var isReportExists = await checkReportExistsToDb(userId, dateFrom, dateTo);

  if (isReportExists) {
    return res.json({ msg: "Отчет за данный период уже существует.\nЧтобы загрузить отчет еще раз, необходимо его удалить." });
  }

  return res.sendStatus(404);
};

module.exports = checkReportExists;
