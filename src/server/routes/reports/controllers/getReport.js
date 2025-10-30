var collectImagesAsBase64 = require("../services/different/collectImagesAsBase64");

var getReport = async (req, res, next) => {
  var { userId, id } = req.params;

  var { getReportById } = req.app.locals.reportCollectionServices;

  var { report } = await getReportById(userId, id);
  var { skuImages } = await collectImagesAsBase64(userId, report.skus);

  var downloadReportLink = "/reports/download-report-as-xlsx/" + userId + "/" + id;

  return res.json({ report, skuImages, downloadReportLink });
};

module.exports = getReport;
