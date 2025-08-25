var { getReportAsXLSXBuffer } = require("../../reports/services/reportAsXLSXBuffer");

var downloadReportAsXLSX = async (req, res, next) => {
  var { id, reportId } = req.params;

  var { report } = req.app.locals?.reports.find((item) => item.id === id && item.report.reportId == reportId);

  if (!report) {
    return res.status(500).json({ msg: "Не удалось скачать отчет..." });
  }

  var buffer = await getReportAsXLSXBuffer(report);

  res.set({
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="download.xlsx"',
  });

  return res.send(buffer);
};

module.exports = downloadReportAsXLSX;
