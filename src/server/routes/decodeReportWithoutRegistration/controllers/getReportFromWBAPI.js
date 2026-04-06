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
  paidTaxAmount: 0,
  mandatoryInsuranceFee: 0,
  insuranceFeePercentage: 10,
  paidInsuranceFee: 0,
  retailAmount: 0,
  finalProfit: 0,
  isInsuranceFeePaid: false,
  additionalInsuranceFee: 0,
  requiresAdditionalInsuranceFee: false,
  excessIncomeForAdditionalInsuranceFee: 300000,
  maxInsuranceFee: 300000,
  mandatoryInsuranceFeeRate: 10,
  hasExcessIncomeForInsurance: false,
  mandatoryInsuranceFeeIsPaid: false,
  additionalInsuranceFeeIsPaid: false,
  excessInsuranceRate: 1,
};

var getReportFromWBAPI = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { dateFrom, dateTo, token, taxRate } = req.body;

  var existReportData = req.app.locals?.reports?.find((item) => item.report.dateFrom === dateFrom);

  if (existReportData) {
    return res.json(existReportData);
  }

  var reports = await wbapi.getReports("decode-without-auth", dateFrom, dateTo, token);

  var { report } = await parseReports(reports, { taxRate, ...taxParamsStub });

  report.dateTo = dateTo;
  report.dateFrom = dateFrom;
  report.totalFinalProfit = 0;
  report.totalProductCosts = 0;
  report.totalProfitMargin = 0;
  report.totalOtherExpenses = 0;
  report.reportId = reports.weeklyFinancialReport[0].realizationreport_id;

  report.skus.map((sku) => {
    ((sku.costPrice = 0), (sku.otherExpenses = 0), (sku.finalProfit = 0), (sku.profitMargin = 0));
  });

  var id = randomBytes(15).toString("hex");

  req.app.locals.reports = [{ id, taxRate, report }];

  var downloadReportLink = "/decode-report-without-registration/xlsx/" + id + "/" + report.reportId;

  return res.json({ id, report, downloadReportLink });
};

export default getReportFromWBAPI;
