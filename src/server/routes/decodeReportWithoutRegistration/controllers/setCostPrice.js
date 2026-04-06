import Joi from "joi";
import calc from "../../reports/services/calcServices/index.js";

var schema = Joi.object({
  id: Joi.string().required(),
  reportId: Joi.number().required(),
  skuIndex: Joi.number().required(),
  costPrice: Joi.number().required(),
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

var setCostPrice = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { id, reportId, skuIndex, costPrice } = req.body;

  var { report, taxRate } = req.app.locals.reports.find((item) => item.id == id && item.report.reportId === reportId);

  var { skus, ...totalParams } = report;
  skus[skuIndex].costPrice = costPrice;
  var updatedSku = skus[skuIndex];

  var { skuWithCalculatedParams } = calc.sku.restParams(updatedSku, { taxRate, ...taxParamsStub });

  skus[skuIndex] = skuWithCalculatedParams;

  var updatedReport = calc.total.restParams(totalParams, skus);

  var { totalFinalProfit, totalProfitMargin } = updatedReport;
  var { profitMargin, finalProfit } = skuWithCalculatedParams;

  var reportIndex = req.app.locals?.reports.findIndex((item) => item.id === id && item.report.reportId === reportId);

  req.app.locals.reports[reportIndex] = { id, report: updatedReport, taxRate };

  return res.json({
    sku: {
      skuIndex,
      data: {
        profitMargin,
        finalProfit,
      },
    },
    total: { totalFinalProfit, totalProfitMargin },
  });
};

export default setCostPrice;
