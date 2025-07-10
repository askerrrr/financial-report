var getReportAsXLSXBuffer = require("../services/getReportAsXLSXBuffer");

var downloadReportAsXLSX = async (req, res, next) => {
  var { reportId } = req.params;
  var { getReportById } = req.app.locals.reportCollectionServices;

  var userId = req.app.locals.userId;

  var report = await getReportById(userId, id);

  var buffer = await getReportAsXLSXBuffer(report);

  return res
    .setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    .setHeader("Content-Disposition", 'attachment; filename="download.txt"')
    .send(buffer);
};

module.exports = downloadReportAsXLSX;
