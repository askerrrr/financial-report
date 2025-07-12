var getReportAsXLSXBuffer = require("../services/reportAsXLSXBuffer");

var downloadReportsAsXLSX = async (req, res, next) => {
  var { userId, reportIds } = req.body;
  var { getReportById } = req.app.locals.reportCollectionServices;
};

module.exports = downloadReportsAsXLSX;
