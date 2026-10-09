import getReportService from "../services/getReport.js";

var getReportController = async (req, res, next) => {
  var { report, reportNotFound, signedUrls, skusWithLastCostPrices } =
    await getReportService(req.params);

  if (reportNotFound) {
    return res.sendStatus(404);
  }

  return res.json({
    report,
    signedUrls,
    skusWithLastCostPrices,
  });
};

export default getReportController;
