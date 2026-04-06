import Joi from "joi";
import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
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

  var { userId, reportId, skuIndex, costPrice, skuId, year } = req.body;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;
  var { updateSkuInListGoods, getSkuFromListGoods } = req.app.locals.goodsCollectionServices;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId, session);
      var { skus, ...totalParams } = report;
      var { skuName } = skus[skuIndex];

      var { skuFromListGoods } = await getSkuFromListGoods(userId, skuId, skuName, session);

      if (skus[skuIndex].costPrice === costPrice) {
        return res.sendStatus(409);
      }

      skus[skuIndex].costPrice = costPrice;

      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];
        var startYearTaxParams = await getTaxParamsFromDb(userId, startYear, session);
        var endYearTaxParams = await getTaxParamsFromDb(userId, endYear, session);
        var taxParams = { startYearTaxParams, endYearTaxParams };

        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, report.crossesTaxYears);
        skus[skuIndex] = result.updatedSku;

        var { startYearTaxParams, endYearTaxParams } = result.taxParams;
        await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
        await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);
      } else {
        var taxParams = await getTaxParamsFromDb(userId, year, session);
        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams);

        skus[skuIndex] = result.updatedSku;

        await changeTaxParamsToDb(userId, year, session, result.taxParams);
      }

      var updatedReport = await calc.total.restParams(totalParams, skus, report.crossesTaxYears);

      await saveUpdatedReport(userId, reportId, updatedReport, session);
      await updateSkuInListGoods(userId, skuId, { lastCostPrice: costPrice, metrics: result.updatedSkuMetrics }, session);

      var { profitMargin, finalProfit } = skus[skuIndex];
      var { totalFinalProfit, totalProfitMargin, totalInsuranceFee } = updatedReport;

      res.json({
        sku: {
          skuIndex,
          data: {
            profitMargin,
            finalProfit,
          },
        },
        total: { totalFinalProfit, totalProfitMargin, totalInsuranceFee },
      });
    });
  } catch (err) {
    console.log({ err });
    //log error
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default setCostPriceToSku;
