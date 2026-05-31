import Joi from "joi";
import calc from "../../reports/services/calcServices/index.js";

var schema = Joi.object({
  userId: Joi.string().required(),
  skuId: Joi.number().required(),
  reportId: Joi.number().required(),
  skuIndex: Joi.number().required(),
  costPrice: Joi.number().required(),
  skuName: Joi.string().required(),
  taxRate: Joi.number().required(),
  totals: Joi.object({
    totalRetailAmount: Joi.number().required(),
    totalFinalProfit: Joi.number().required(),
    totalProfitMargin: Joi.number().required(),
    totalProductCosts: Joi.number().required(),
    totalInsuranceFee: Joi.number().required(),
    totalPreTaxProfit: Joi.number().required(),
    totalOtherExpenses: Joi.number().required(),
  }).required(),
  skus: Joi.array().items(
    Joi.object({
      tax: Joi.number().required(),
      qty: Joi.number().required(),
      isCostPriceSet: Joi.boolean(),
      profit: Joi.number().required(),
      costPrice: Joi.number().required(),
      finalProfit: Joi.number().required(),
      profitMargin: Joi.number().required(),
      retailAmount: Joi.number().required(),
      insuranceFee: Joi.number().required(),
      preTaxProfit: Joi.number().required(),
      otherExpenses: Joi.number().required(),
      isInsuranceFeeIncluded: Joi.boolean(),
      additionalInsuranceFee: Joi.number().required(),
    }),
  ),
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

  var { userId, reportId, costPrice, skuIndex, skus, totals, taxRate } = req.body;

  var skuToUpdate = skus[skuIndex];
  var prevSkuData = {};
  prevSkuData.costPrice = costPrice;
  prevSkuData.qty = skuToUpdate.qty;
  prevSkuData.finalProfit = skuToUpdate.finalProfit;
  prevSkuData.preTaxProfit = skuToUpdate.preTaxProfit;
  prevSkuData.insuranceFee = skuToUpdate.insuranceFee;
  prevSkuData.otherExpenses = skuToUpdate.otherExpenses;

  skuToUpdate.costPrice = costPrice;

  var { skuWithCalculatedParams } = calc.sku.restParams(skuToUpdate, { taxRate, ...taxParamsStub });

  skus[skuIndex] = skuWithCalculatedParams;

  var { updatedTotals } = calc.total.restParams(totals, prevSkuData, skuWithCalculatedParams);

  var { profitMargin, finalProfit, isCostPriceSet, insuranceFee, preTaxProfit, isInsuranceFeeIncluded } = skuWithCalculatedParams;

  return res.json({
    sku: {
      userId,
      skuIndex,
      data: { profitMargin, finalProfit, isCostPriceSet, insuranceFee, preTaxProfit, isInsuranceFeeIncluded, costPrice },
    },
    totals: {
      totalFinalProfit: updatedTotals.totalFinalProfit,
      totalProfitMargin: updatedTotals.totalProfitMargin,
      totalProductCosts: updatedTotals.totalProductCosts,
      totalInsuranceFee: updatedTotals.totalInsuranceFee,
      totalPreTaxProfit: updatedTotals.totalPreTaxProfit,
      totalOtherExpenses: updatedTotals.totalPreTaxProfit,
    },
  });
};

export default setCostPrice;
