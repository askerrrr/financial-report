import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import getPrevTotalsData from "../services/different/getPrevTotalsData.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";
import processOfSkuCostPriceSetting from "../services/different/processOfSkuCostPriceSetting.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var setCostPriceToSkus = async (req, res, next) => {
  if (!req.body.costPrices.length) {
    return res.sendStatus(304);
  }

  var { userId, reportId, taxYear, costPrices } = req.body;

  var { saveUpdatedReport, getReportById } = dbUtils.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;
  var { getListGoodsFromDb, saveUpdatedSkuMetrics } = dbUtils.goodsCollectionServices;

  var prevSkuData;
  var prevReportTotals;
  var skusDataToClient = [];
  var skuMetricsToUpdate = [];
  var skuNames = costPrices.map(({ skuName }) => skuName);

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var taxParams = {};
      var { report } = await getReportById(userId, reportId);
      var { listGoods } = await getListGoodsFromDb(userId, skuNames, session);
      var { skus, ...totalParams } = report;

      var allTaxParams = await getTaxParamsFromDb(userId, null, session);
      var startYear = +report.dateFrom.split("-")[0];
      var endYear = +report.dateTo.split("-")[0];
      var startYearTaxParams = allTaxParams.find((param) => param.year === startYear);
      var endYearTaxParams = allTaxParams.find((param) => param.year === endYear);
      var crossYearTaxParams = { startYearTaxParams, endYearTaxParams };
      var taxParamsOfYear = allTaxParams.find((param) => param.year === taxYear);

      for (var { id, skuName, lastCostPrice } of costPrices) {
        var skuIndex = skus.findIndex((sku) => sku.id === id && sku.skuName === skuName);

        if (skus[skuIndex].costPrice !== lastCostPrice) {
          prevSkuData = getPrevSkuData(skus[skuIndex]);
          prevReportTotals = getPrevTotalsData(totalParams);
          var skuFromListGoods = listGoods.find((sku) => sku.id === id && sku.skuName === skuName);

          skus[skuIndex].costPrice = lastCostPrice;

          if (report.crossesTaxYears) {
            var result = await processOfSkuCostPriceSetting(
              skus[skuIndex],
              skuFromListGoods,
              crossYearTaxParams,
              report.crossesTaxYears,
              prevSkuData,
            );
            skus[skuIndex] = result.updatedSku;

            totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.crossesTaxYears).updatedTotals;

            crossYearTaxParams = result.taxParams;
            crossYearTaxParams.startYearTaxParams = recalculateTaxParams(
              crossYearTaxParams.startYearTaxParams,
              prevReportTotals,
              totalParams,
              currentYearPostfix,
            ).recalculatedTaxParams;

            crossYearTaxParams.endYearTaxParams = recalculateTaxParams(
              crossYearTaxParams.endYearTaxParams,
              prevReportTotals,
              totalParams,
              endYearPostfix,
            ).recalculatedTaxParams;

            skuMetricsToUpdate.push(result.updatedSkuMetrics);

            // await saveUpdatedSkuMetrics(userId, id, result.updatedSkuMetrics, session);

            var { startYearTaxParams, endYearTaxParams } = taxParams;
          } else {
            var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParamsOfYear, report.crossesTaxYears, prevSkuData);
            skus[skuIndex] = result.updatedSku;

            totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex]).updatedTotals;
            taxParamsOfYear = recalculateTaxParams(result.taxParams, prevReportTotals, totalParams).recalculatedTaxParams;

            skuMetricsToUpdate.push(result.updatedSkuMetrics);
            // await saveUpdatedSkuMetrics(userId, id, result.updatedSkuMetrics, session);
          }

          var changedSkuData = excludeEqualParams(prevSkuData, skus[skuIndex]);

          skusDataToClient.push({
            skuIndex,
            data: { lastCostPrice, ...changedSkuData },
          });
        }
      }

      if (!skusDataToClient.length) {
        return res.sendStatus(409);
      }

      if (report.crossesTaxYears) {
        var { startYearTaxParams, endYearTaxParams } = crossYearTaxParams;
        // await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
      } else {
        // await changeTaxParamsToDb(userId, session, taxParamsOfYear);
      }

      // await saveUpdatedReport(userId, reportId, { skus, ...totalParams }, session);

      var changedTotalsData = excludeEqualParams(prevReportTotals, totalParams);

      res.json({
        skusDataToClient,
        totals: { ...changedTotalsData },
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
