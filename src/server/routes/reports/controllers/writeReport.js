var getReportDate = require("../services/writeAndCalcReportDataServices/getReportDate");
var getReportDataFromXLSX = require("../services/writeAndCalcReportDataServices/getReportDataFromXLSX");

var writeReport = async (req, res, next) => {
  if (!req.fileMimeTypeIsValid) {
    return res.sendStatus(500);
  }

  var userId = req.app.locals.userId;

  var { createReport } = req.app.locals.reportCollectionServices;

  if (req.file) {
    var data = await getReportDataFromXLSX(req.file.path, userId);

    data.date = await getReportDate(req.file.filename);

    var reportSuccessfullyRecorded = await createReport(userId, data);

    if (!reportSuccessfullyRecorded) {
      return res.sendStatus(500);
    }

    return res.status(200).json({ msg: "success upload", userId, data });
  }
};

module.exports = writeReport;
