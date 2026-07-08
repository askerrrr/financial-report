import Joi from "joi";
import { randomBytes } from "node:crypto";
import wbapi from "../../reports/services/WBAPI/index.js";
import parseReports from "../../reports/services/reportParsing/index.js";

var schema = Joi.object({
  dateFrom: Joi.string().required(),
  dateTo: Joi.string().required(),
  token: Joi.string().required(),
  taxRate: Joi.number().required(),
});

var taxParamsStub = {
  finalProfit: 0,
  retailAmount: 0,
  paidTaxAmount: 0,
  paidInsuranceFee: 0,
  excessInsuranceRate: 1,
  maxInsuranceFee: 300000,
  mandatoryInsuranceFee: 0,
  isInsuranceFeePaid: false,
  additionalInsuranceFee: 0,
  insuranceFeePercentage: 10,
  mandatoryInsuranceFeeRate: 10,
  hasExcessIncomeForInsurance: false,
  mandatoryInsuranceFeeIsPaid: false,
  additionalInsuranceFeeIsPaid: false,
  requiresAdditionalInsuranceFee: false,
  excessIncomeForAdditionalInsuranceFee: 300000,
};

var getReportFromWBAPI = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { dateFrom, dateTo, token, taxRate } = req.body;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var reports = await wbapi.getReports("decode-without-auth", dateFrom, dateTo, token);
  var { reportId } = reports.weeklyFinancialReport[0];

  if (isCrossYearPeriod) {
    var startYearTaxParamsStub = Object.assign({}, { taxRate, ...taxParamsStub });
    var endYearTaxParamsStub = Object.assign({}, { taxRate, ...taxParamsStub });

    var taxParams = { startYearTaxParams: startYearTaxParamsStub, endYearTaxParams: endYearTaxParamsStub };

    var { report } = await parseReports(reports, taxParams, isCrossYearPeriod);
  } else {
    var { report } = await parseReports(reports, { taxRate, ...taxParamsStub });
  }

  var userId = randomBytes(15).toString("hex");

  report.userId = userId;
  report.dateTo = dateTo;
  report.taxRate = taxRate;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.totalFinalProfit = 0;
  report.totalProductCosts = 0;
  report.totalProfitMargin = 0;
  report.totalOtherExpenses = 0;
  report.isCrossYearPeriod = isCrossYearPeriod;

  return res.json({ report });
};

export default getReportFromWBAPI;
