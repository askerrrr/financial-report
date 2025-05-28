var getReportDate = require("../services/getReportDate");
var getReportDataFromXLSX = require("../services/getReportDataFromXLSX");

var writeReports = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { createReport } = req.app.locals.reportCollectionServices();

  var count = 0;

  var reports = [];

  for (var file of req.files) {
    var data = await getReportDataFromXLSX(file.path, userId);

    data.date = await getReportDate(file.filename);

    var reportSuccessfullyRecorded = await createReport(userId, data);

    if (reportSuccessfullyRecorded) {
      reports.push(data);
      count++;
    }
  }

  if (count == req.files.length) {
    res.status(200).json({ msg: "success upload", userId, reports });
  }
};

module.exports = writeReports;
