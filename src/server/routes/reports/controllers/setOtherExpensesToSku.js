import calc from "../services/calcServices/index.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import truncateNum from "../services/reportParsing/truncateNum.js";
import getPrevSkuData from "../services/different/getPrevSkuData.js";
import getPrevTotalsData from "../services/different/getPrevTotalsData.js";
import excludeEqualParams from "../services/different/excludeEqualParams.js";
import recalculateTaxParams from "../services/different/recalculateTaxParams.js";
import processOfSkuCostPriceSetting from "../services/different/processOfSkuCostPriceSetting.js";

var currentYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var setOtherExpensesToSku = async (req, res, next) => {
  var { userId, reportId, skuIndex, skuName, otherExpenses, skuId, year } = req.body;
  var { saveUpdatedReport, getReportById } = dbUtils.reportCollectionServices;
  var { updateSkuInListGoods, getSkuFromListGoods } = dbUtils.goodsCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;

  var updatedReport;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId, session);
      var { skus, ...totalParams } = report;

      if (skus[skuIndex].otherExpenses === otherExpenses) {
        return res.sendStatus(409);
      }

      var allTaxParams = await getTaxParamsFromDb(userId, null, session);
      var startYear = +report.dateFrom.split("-")[0];
      var endYear = +report.dateTo.split("-")[0];
      var taxParamsOfYear = allTaxParams.find((param) => param.year === year);
      var startYearTaxParams = allTaxParams.find((param) => param.year === startYear);
      var endYearTaxParams = allTaxParams.find((param) => param.year === endYear);
      var crossYearTaxParams = { startYearTaxParams, endYearTaxParams };

      var { skuFromListGoods } = await getSkuFromListGoods(userId, skuId, skuName, session);

      var prevSkuData = getPrevSkuData(skus[skuIndex]);
      var prevReportTotals = getPrevTotalsData(totalParams);

      var halfOfOtherExpenses = truncateNum(otherExpenses / 2);

      skus[skuIndex].otherExpenses = otherExpenses;
      skus[skuIndex].otherExpensesInCurrentYear = halfOfOtherExpenses;
      skus[skuIndex].otherExpensesInNextYear = halfOfOtherExpenses;

      if (skus[skuIndex].isCostPriceSet) {
        if (report.crossesTaxYears) {
          var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, crossYearTaxParams, report.crossesTaxYears, prevSkuData);

          skus[skuIndex] = result.updatedSku;

          totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.crossesTaxYears).updatedTotals;

          var { startYearTaxParams, endYearTaxParams } = result.taxParams;

          startYearTaxParams = recalculateTaxParams(startYearTaxParams, prevReportTotals, totalParams, currentYearPostfix).recalculatedTaxParams;
          endYearTaxParams = recalculateTaxParams(endYearTaxParams, prevReportTotals, totalParams, endYearPostfix).recalculatedTaxParams;

          updatedReport = { ...totalParams, skus };

          await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
          await updateSkuInListGoods(userId, skuId, skuName, { metrics: result.updatedSkuMetrics });
        } else {
          var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParamsOfYear, null, prevSkuData);

          skus[skuIndex] = result.updatedSku;

          totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex]).updatedTotals;
          taxParamsOfYear = recalculateTaxParams(taxParamsOfYear, prevReportTotals, totalParams).recalculatedTaxParams;

          updatedReport = { ...totalParams, skus };

          await changeTaxParamsToDb(userId, session, result.taxParams);
          await updateSkuInListGoods(userId, skuId, skuName, { metrics: result.updatedSkuMetrics });
        }
      } else {
        if (report.crossesTaxYears) {
          totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.crossesTaxYears).updatedTotals;

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

          var startYearSkuMetrics = skuFromListGoods.metrics.find((i) => i.year === startYear);
          var endYearSkuMetrics = skuFromListGoods.metrics.find((i) => i.year === endYear);

          var recalculatedStartYearMetricsOtherExpenses =
            startYearSkuMetrics.otherExpenses - prevSkuData.otherExpensesInCurrentYear + halfOfOtherExpenses;
          startYearSkuMetrics.otherExpenses = truncateNum(recalculatedStartYearMetricsOtherExpenses);

          var recalculatedEndYearMetricsOtherExpenses = endYearSkuMetrics.otherExpenses - prevSkuData.otherExpensesInNextYear + halfOfOtherExpenses;
          endYearSkuMetrics.otherExpenses = truncateNum(recalculatedEndYearMetricsOtherExpenses);

          updatedReport = { ...totalParams, skus };

          await changeTaxParamsToDb(userId, session, crossYearTaxParams.startYearTaxParams, crossYearTaxParams.endYearTaxParams);
          await updateSkuInListGoods(userId, skuId, skuName, { metrics: skuFromListGoods.metrics });
        } else {
          totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex]).updatedTotals;
          taxParamsOfYear = recalculateTaxParams(taxParamsOfYear, prevReportTotals, totalParams).recalculatedTaxParams;

          var skuMetrics = skuFromListGoods.metrics.find((i) => i.year === year);

          var recalculatedSkuMetricsOtherExpenses = skuMetrics.otherExpenses - prevSkuData.otherExpenses + otherExpenses;
          skuMetrics.otherExpenses = truncateNum(recalculatedSkuMetricsOtherExpenses);

          updatedReport = { ...totalParams, skus };

          await changeTaxParamsToDb(userId, session, taxParams);
          await updateSkuInListGoods(userId, skuId, skuName, { metrics: skuFromListGoods.metrics });
        }
      }

      await saveUpdatedReport(userId, reportId, updatedReport, session);

      var { profitMargin, finalProfit } = updatedReport.skus[skuIndex];
      var { totalFinalProfit, totalProfitMargin, totalInsuranceFee, totalOtherExpenses } = updatedReport;

      var { skus, ...totals } = updatedReport;

      var changedTotalsData = excludeEqualParams(prevReportTotals, totals);
      var changedSkuData = excludeEqualParams(prevSkuData, skus[skuIndex]);

      return res.status(200).json({
        totals: changedTotalsData,
        sku: {
          skuIndex,
          data: { ...changedSkuData },
        },
      });
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default setOtherExpensesToSku;
