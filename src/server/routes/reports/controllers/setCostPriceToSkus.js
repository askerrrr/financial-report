import Joi from "joi";
import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import processOfSkuCostPriceSetting from "../services/different/processOfSkuCostPriceSetting.js";

var costPricesItemSchema = Joi.object({ id: Joi.number().required(), skuName: Joi.string().required(), lastCostPrice: Joi.number().required() });
var schema = Joi.object({
  userId: Joi.string().required(),
  reportId: Joi.number().required(),
  taxYear: Joi.number().required(),
  costPrices: Joi.array().items(costPricesItemSchema).required(),
});

var setCostPriceToSkus = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId, reportId, taxYear, costPrices } = req.body;
  var { saveUpdatedReport, getReportById } = dbUtils.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;
  var { getListGoodsFromDb, saveUpdatedSkuMetrics } = dbUtils.goodsCollectionServices;

  if (!costPrices.length) {
    return res.sendStatus(304);
  }

  var skusDataToClient = [];
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var taxParams = {};
      var { report } = await getReportById(userId, reportId);
      var { listGoods } = await getListGoodsFromDb(userId, session);
      var { skus, ...totalParams } = report;

      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];
        var allTaxParams = await getTaxParamsFromDb(userId, null, session);
        taxParams.startYearTaxParams = allTaxParams.find((param) => param.year == startYear);
        taxParams.endYearTaxParams = allTaxParams.find((param) => param.year == endYear);
      } else {
        taxParams = await getTaxParamsFromDb(userId, taxYear, session);
      }

      for (var { id, skuName, lastCostPrice } of costPrices) {
        var skuIndex = skus.findIndex((sku) => sku.id === id && sku.skuName === skuName);

        if (skus[skuIndex].costPrice === lastCostPrice) {
          continue;
        }

        skus[skuIndex].costPrice = lastCostPrice;
        skus[skuIndex].isCostPriceSet = true;
        var skuFromListGoods = listGoods.find((sku) => sku.id === id && sku.skuName === skuName);

        if (report.crossesTaxYears) {
          var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, report.crossesTaxYears);

          skus[skuIndex] = result.updatedSku;
          taxParams = result.taxParams;

          await saveUpdatedSkuMetrics(userId, id, result.updatedSkuMetrics, session);
        } else {
          var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, report.crossesTaxYears);
          skus[skuIndex] = result.updatedSku;
          taxParams = result.taxParams;
          await saveUpdatedSkuMetrics(userId, id, result.updatedSkuMetrics, session);
        }

        var { profitMargin, finalProfit } = skus[skuIndex];

        skusDataToClient.push({
          skuIndex,
          data: { profitMargin, finalProfit, costprice: lastCostPrice },
        });
      }

      if (!skusDataToClient.length) {
        return res.sendStatus(409);
      }

      if (report.crossesTaxYears) {
        var { startYearTaxParams, endYearTaxParams } = taxParams;
        await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
      } else {
        await changeTaxParamsToDb(userId, session, taxParams);
      }

      var updatedReport = await calc.total.oldTotalRestParams(totalParams, skus, report.crossesTaxYears);

      await saveUpdatedReport(userId, reportId, updatedReport, session);

      res.json({
        skusDataToClient,
        totals: { totalFinalProfit: totalParams.totalFinalProfit, totalProfitMargin: totalParams.totalProfitMargin },
      });
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default setCostPriceToSkus;
