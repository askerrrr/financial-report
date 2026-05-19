import Joi from "joi";
import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import processOfSkuCostPriceSetting from "../services/different/processOfSkuCostPriceSetting.js";

var schema = Joi.object({
  userId: Joi.string().required(),
  reportId: Joi.number().required(),
  skuIndex: Joi.number().required(),
  skuId: Joi.number().required(),
  year: Joi.number().required(),
  skuName: Joi.string().required(),
  costPrice: Joi.number().required(),
  otherExpenses: Joi.number().required(),
});

var setCostPriceToSku = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId, reportId, skuIndex, costPrice, skuId, skuName, year } = req.body;
  var { saveUpdatedReport, getReportById } = dbUtils.reportCollectionServices;
  var { updateSkuInListGoods, getSkuFromListGoods } = dbUtils.goodsCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId, session);

      var { skus, ...totalParams } = report;

      if (skus[skuIndex].costPrice === costPrice) {
        return res.sendStatus(409);
      }

      var allTaxParams = await getTaxParamsFromDb(userId, null, session);
      var { skuFromListGoods } = await getSkuFromListGoods(userId, skuId, skuName, session);

      var prevSkuData = getPrevSkuData(skus[skuIndex], report.crossesTaxYears);

      skus[skuIndex].costPrice = costPrice;

      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];

        var startYearTaxParams = allTaxParams.find((param) => param.year === startYear);
        var endYearTaxParams = allTaxParams.find((param) => param.year === endYear);

        var taxParams = { startYearTaxParams, endYearTaxParams };

        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, report.crossesTaxYears, prevSkuData);
        skus[skuIndex] = result.updatedSku;

        var { startYearTaxParams, endYearTaxParams } = result.taxParams;

        await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
      } else {
        var taxParams = allTaxParams.find((param) => param.year === year);
        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, null, prevSkuData);

        skus[skuIndex] = result.updatedSku;
        await changeTaxParamsToDb(userId, session, result.taxParams);
      }

      var { updatedTotals } = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex]);

      await saveUpdatedReport(userId, reportId, { skus, ...updatedTotals }, session);
      await updateSkuInListGoods(userId, skuId, { lastCostPrice: costPrice, metrics: result.updatedSkuMetrics }, session);

      var { profitMargin, finalProfit } = skus[skuIndex];
      var { totalFinalProfit, totalProfitMargin, totalInsuranceFee } = updatedTotals;

      return res.json({
        sku: {
          skuIndex,
          data: {
            profitMargin,
            finalProfit,
          },
        },
        totals: { totalFinalProfit, totalProfitMargin, totalInsuranceFee },
      });
    });
  } catch (err) {
    console.log(err);
    //log error
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default setCostPriceToSku;
