var checkReportExistsInTree = require("../services/different/checkReportExistsInTree");

var checkReportExists = async (req, res, next) => {
  var { dateFrom, userId } = req.body;
  var { getReportTree } = req.app.locals.reportsTreeCollectionServices;

  var { reportTree } = await getReportTree(userId);
  var { reportIsExist } = checkReportExistsInTree(dateFrom, reportTree);

  if (reportIsExist) {
    return res.status(409).json({ msg: "Отчет за данный период уже существует.\nЧтобы загрузить отчет еще раз, необходимо его удалить." });
  }

  next();
};

module.exports = checkReportExists;
