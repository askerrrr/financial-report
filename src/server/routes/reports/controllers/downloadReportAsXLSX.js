var { getReportAsXLSXBuffer } = require("../services/reportAsXLSXBuffer");

var downloadReportAsXLSX = async (req, res, next) => {
  var { userId, reportId } = req.params;
  var { getReportById } = req.app.locals.reportCollectionServices;

  var report = await getReportById(userId, reportId);

  var buffer = await getReportAsXLSXBuffer(report);

  res.set({
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="download.xlsx"',
  });

  return res.send(buffer);
};

module.exports = downloadReportAsXLSX;
