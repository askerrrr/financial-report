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
  // var { error } = schema.validate(req.body);

  // if (error) {
  //   return res.sendStatus(400);
  // }

  var { userId, reportId, costPrice, sku, skuIndex, skus, totals, taxRate } = req.body;

  sku.costPrice = costPrice;

  var { skuWithCalculatedParams } = calc.sku.restParams(sku, { taxRate, ...taxParamsStub });

  skus[skuIndex] = skuWithCalculatedParams;

  var { skus, ...totals } = calc.total.restParams(totals, skus);

  var { profitMargin, finalProfit, isCostPriceSet, insuranceFee, preTaxProfit, isInsuranceFeeIncluded } = skuWithCalculatedParams;

  return res.json({
    sku: {
      userId,
      skuIndex,
      data: { profitMargin, finalProfit, isCostPriceSet, insuranceFee, preTaxProfit, isInsuranceFeeIncluded },
    },
    totals: {
      totalFinalProfit: totals.totalFinalProfit,
      totalProfitMargin: totals.totalProfitMargin,
      totalProductCosts: totals.totalProductCosts,
      totalInsuranceFee: totals.totalInsuranceFee,
      totalPreTaxProfit: totals.totalPreTaxProfit,
      totalOtherExpenses: totals.totalPreTaxProfit,
    },
  });
};

export default setCostPrice;
