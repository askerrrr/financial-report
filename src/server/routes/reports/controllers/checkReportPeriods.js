import checkReportPeriodsService from "../services/checkReportPeriods.js";

var checkReportPeriodsController = (req, res, next) => {
  var dateFrom = req.body?.dateFrom;
  var dateTo = req.body?.dateTo;

  var { errorText } = checkReportPeriodsService(dateFrom, dateTo);

  if (errorText) {
    return res.json({ errorText, reportData: {}, infoText: "" });
  }

  next();
};

export default checkReportPeriodsController;
