import Joi from "joi";
import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import getPrevTotalsData from "../services/different/getPrevTotalsData.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";
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

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

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

      var prevSkuData = getPrevSkuData(skus[skuIndex]);
      var prevReportTotals = getPrevTotalsData(totalParams);

      skus[skuIndex].costPrice = costPrice;

      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];
        var startYearTaxParams = allTaxParams.find((param) => param.year === startYear);
        var endYearTaxParams = allTaxParams.find((param) => param.year === endYear);
        var crossYearTaxParams = { startYearTaxParams, endYearTaxParams };

        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, crossYearTaxParams, report.crossesTaxYears, prevSkuData);
        skus[skuIndex] = result.updatedSku;

        totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.crossesTaxYears).updatedTotals;

        var { startYearTaxParams, endYearTaxParams } = result.taxParams;

        startYearTaxParams = recalculateTaxParams(startYearTaxParams, prevReportTotals, totalParams, currentYearPostfix).recalculatedTaxParams;
        endYearTaxParams = recalculateTaxParams(endYearTaxParams, prevReportTotals, totalParams, endYearPostfix).recalculatedTaxParams;

        await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
      } else {
        var taxParamsOfYear = allTaxParams.find((param) => param.year === year);
        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParamsOfYear, null, prevSkuData);

        skus[skuIndex] = result.updatedSku;

        totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex]).updatedTotals;

        result.taxParams = recalculateTaxParams(result.taxParams, prevReportTotals, totalParams).recalculatedTaxParams;
        await changeTaxParamsToDb(userId, session, result.taxParams);
      }

      await saveUpdatedReport(userId, reportId, { skus, ...totalParams }, session);
      await updateSkuInListGoods(userId, skuId, skuName, { lastCostPrice: costPrice, metrics: result.updatedSkuMetrics }, session);

      var updatedSku = skus[skuIndex];
      var changedSkuData = excludeEqualParams(prevSkuData, updatedSku);
      var changedTotalsData = excludeEqualParams(prevReportTotals, totalParams);

      return res.json({
        totals: changedTotalsData,
        sku: {
          skuIndex,
          data: {
            ...changedSkuData,
          },
        },
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
