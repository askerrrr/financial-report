var Joi = require("joi");
var collectImagesAsBase64 = require("../services/different/collectImagesAsBase64");
var filterCostsForReportSkus = require("../services/different/filterCostsForReportSkus");

var schema = Joi.object({ userId: Joi.string().required(), reportId: Joi.number().required() });

var getReport = async (req, res, next) => {
  var { error } = schema.validate(req.params);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId, reportId } = req.params;

  var { getReportById } = req.app.locals.reportCollectionServices;
  var { getSkusLastCostPrice } = req.app.locals.goodsCollectionServices;

  var { report } = await getReportById(userId, reportId);
  var { skusLastCostPrice } = await getSkusLastCostPrice(userId);

  var { skuImages } = await collectImagesAsBase64(userId, report.skus);

  var { skusLastCostPrice } = await filterCostsForReportSkus(report.skus, skusLastCostPrice);

  var downloadReportLink = "/reports/download-report-as-xlsx/" + userId + "/" + reportId;

  return res.json({ report, skuImages, skusLastCostPrice, downloadReportLink });
};

module.exports = getReport;
