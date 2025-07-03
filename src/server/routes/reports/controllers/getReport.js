var collectImagesAsBase64 = require("../services/different/collectImagesAsBase64");

var getReport = async (req, res, next) => {
  var { userId, id } = req.params;

  var { getReportById } = req.app.locals.reportCollectionServices;

  var report = await getReportById(userId, id);

  var imageCollection = await collectImagesAsBase64(userId, report.skus);

  return res.json({ report, imageCollection });
};

module.exports = getReport;
