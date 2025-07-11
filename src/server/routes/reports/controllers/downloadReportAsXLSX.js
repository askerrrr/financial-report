var getReportAsXLSXBuffer = require("../services/reportAsXLSXBuffer");

var downloadReportAsXLSX = async (req, res, next) => {
  var { userId, reportId } = req.params;
  var { getReportById } = req.app.locals.reportCollectionServices;

  var report = await getReportById(userId, reportId);

  var buffer = await getReportAsXLSXBuffer(report);

  return res
    .setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    .setHeader("Content-Disposition", 'attachment; filename="download.xlsx"')
    .send(buffer);
};

module.exports = downloadReportAsXLSX;
