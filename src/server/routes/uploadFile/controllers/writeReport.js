var getXLSXData = require("../services/getXLSXData");

var writeReport = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { createReport, createReportsEntity } =
    req.app.locals.reportCollectionServices();

  await createReportsEntity(userId);

  if (req.file) {
    var data = await getXLSXData(req.file.path);

    var reportSuccessfullyRecorded = await createReport(userId, data);

    if (!reportSuccessfullyRecorded) {
      return res
        .status(500)
        .json({ msg: "Возникла ошибка при загрузке файла" });
    }

    res.status(200).json({ msg: "success upload" });
  }
};

module.exports = writeReport;
