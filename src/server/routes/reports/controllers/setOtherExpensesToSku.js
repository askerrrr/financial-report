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
  var { userId, reportId, skuIndex, skuName, skuId, year } = req.body;
  var { saveUpdatedReport, getReportById } = dbUtils.reportCollectionServices;
  var { updateSkuInListGoods, getSkuFromListGoods } = dbUtils.goodsCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = dbUtils.taxParamsCollectionServices;

  var updatedReport;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId, session);
      var taxParams = await getTaxParamsFromDb(userId, year, session);
      var { skuFromListGoods } = await getSkuFromListGoods(userId, skuId, skuName, session);

      var { skus, ...totalParams } = report;

      var postfix = "";
      var startYear = +report.dateFrom.split("-")[0];

      if (report.isCrossYearPeriod) {
        postfix = year === startYear ? currentYearPostfix : endYearPostfix;
      }

      if (skus[skuIndex]["otherExpenses"] === req.body["otherExpenses" + postfix]) {
        return res.sendStatus(409);
      }

      var prevSkuData = getPrevSkuData(skus[skuIndex]);
      var prevReportTotals = getPrevTotalsData(totalParams);

      skus[skuIndex]["otherExpenses" + postfix] = req.body["otherExpenses" + postfix];

      if (report.isCrossYearPeriod) {
        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, prevSkuData, postfix);

        skus[skuIndex] = result.updatedSku;

        totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.isCrossYearPeriod, postfix).updatedTotals;

        taxParams = recalculateTaxParams(taxParams, prevReportTotals, totalParams, postfix).recalculatedTaxParams;

        updatedReport = { ...totalParams, skus };

        await updateSkuInListGoods(userId, skuId, skuName, { metrics: result.updatedSkuMetrics });
      } else {
        var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, prevSkuData, postfix);

        skus[skuIndex] = result.updatedSku;

        totalParams = calc.total.restParams(totalParams, prevSkuData, skus[skuIndex], report.isCrossYearPeriod, postfix).updatedTotals;

        taxParams = recalculateTaxParams(taxParams, prevReportTotals, totalParams, postfix).recalculatedTaxParams;

        updatedReport = { ...totalParams, skus };

        await updateSkuInListGoods(userId, skuId, skuName, { metrics: result.updatedSkuMetrics });
      }

      await changeTaxParamsToDb(userId, session, taxParams);
      await saveUpdatedReport(userId, reportId, updatedReport, session);

      var { skus, ...totals } = updatedReport;

      var profitMargin = skus[skuIndex]["profitMargin" + postfix];
      var finalProfit = skus[skuIndex]["finalProfit" + postfix];

      var totalFinalProfit = totalParams["totalFinalProfit" + postfix];
      var totalProfitMargin = totalParams["totalProfitMargin" + postfix];

      return res.status(200).json({
        year,
        totals: { totalProfitMargin, totalFinalProfit },
        sku: {
          skuIndex,
          data: { profitMargin, finalProfit },
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
