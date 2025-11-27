var collectImagesAsBase64 = require("../services/different/collectImagesAsBase64");

var getReport = async (req, res, next) => {
  var { userId, reportId } = req.params;

  var { getReportById } = req.app.locals.reportCollectionServices;
  var { getSkusLastCostPrice } = req.app.locals.goodsCollectionServices;

  var { skusLastCostPrice } = await getSkusLastCostPrice(userId);

  var { report } = await getReportById(userId, reportId);
  var { skuImages } = await collectImagesAsBase64(userId, report.skus);

  var downloadReportLink = "/reports/download-report-as-xlsx/" + userId + "/" + reportId;

  return res.json({ report, skuImages, skusLastCostPrice, downloadReportLink });
};

module.exports = getReport;
