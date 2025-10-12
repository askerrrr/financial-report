var getYearsDto = require("../services/getYearsDto");
var getReportsDto = require("../services/getReportsDto");

var getReportsData = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getReportsByUserId } = req.app.locals.reportCollectionServices;
  var { getReportsTree } = req.app.locals.reportsTreeCollectionServices;

  var { years } = await getReportsTree(userId);

  var reports = await getReportsByUserId(userId);

  var [yearsDto, reportsDto] = await Promise.all([getYearsDto(years), getReportsDto(reports)]);

  return res.json({ reports: reportsDto, years, yearsDto });
};

module.exports = getReportsData;
