var JSZip = require("jszip");
var { getReportAsXLSXBuffer, getMonthlySummaryBuffer } = require("../services/reportAsXLSXBuffer");

var downloadReportsAsZip = async (req, res, next) => {
  var reports = req.reports;

  var zip = new JSZip();

  var folder = zip.folder("Отчеты");

  for (var report of reports) {
    var buffer = await getReportAsXLSXBuffer(report);

    var fileName = `Расшифровка отчета от ${report.dateFrom} по ${report.dateTo}.xlsx`;

    folder.file(fileName, buffer);
  }

  var monthlySummaryBuffer = await getMonthlySummaryBuffer(reports);

  folder.file("Сводка.xlsx", monthlySummaryBuffer);

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

module.exports = downloadReportsAsZip;
