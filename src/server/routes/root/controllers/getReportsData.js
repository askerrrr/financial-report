var getReportsDto = require("../services/getReportsDto");

var getReportsData = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getReportsByUserId } = req.app.locals.reportCollectionServices();

  var reports = await getReportsByUserId(userId);

  return res.json({ reports });
};

module.exports = getReportsData;
