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

  var zipBuffer = zip.generateNodeStream({
    type: "nodebuffer",
    streamFiles: true,
  });

  return res
    .setHeader("Content-Type", "application/zip")
    .setHeader("Content-Disposition", 'attachment; filename="download.zip"')
    .send(zipBuffer);
};

module.exports = downloadReportsAsXLSX;
