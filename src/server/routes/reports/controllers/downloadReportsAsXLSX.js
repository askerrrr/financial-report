var JSZip = require("jszip");
var getReportAsXLSXBuffer = require("../services/reportAsXLSXBuffer");

var downloadReportsAsXLSX = async (req, res, next) => {
  var { userId, reportIds } = req.body;
  var { getReportById } = req.app.locals.reportCollectionServices;

  var zip = new JSZip();

  var folder = zip.folder("Отчеты");

  for (var id of reportIds) {
    var report = await getReportById(userId, id);

    var buffer = await getReportAsXLSXBuffer(report);

    var fileName = `Расшифровка отчета от ${report.dateFrom} по ${report.dateTo}.xlsx`;

    folder.file(fileName, buffer);
  }

  var zipBuffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  res.set({
    "Content-Type": "application/zip",
    "Content-Disposition": 'attachment; filename="reports.zip"',
    "Content-Length": zipBuffer.length,
  });

  return res.send(zipBuffer);
};

module.exports = downloadReportsAsXLSX;
