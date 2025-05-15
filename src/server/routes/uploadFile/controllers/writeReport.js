var getReportDataXLSX = require("../services/getReportDataXLSX");

var writeReport = async (req, res, next) => {
  if (!req.fileMimeTypeIsValid) {
    return res.sendStatus(500);
  }

  var userId = req.app.locals.userId;

  var { createReport } = req.app.locals.reportCollectionServices();

  if (req.file) {
    var data = await getReportDataXLSX(req.file.path);

    var reportSuccessfullyRecorded = await createReport(userId, data);

    if (!reportSuccessfullyRecorded) {
      return res.sendStatus(500);
    }

    res.status(200).json({ msg: "success upload" });
  }
};

module.exports = writeReport;
