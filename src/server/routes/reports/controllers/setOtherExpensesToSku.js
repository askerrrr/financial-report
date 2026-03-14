var Joi = require("joi");
var calc = require("../services/calcServices");
var { dbClient } = require("../../../database");
var processOfSkuCostPriceSetting = require("../services/different/processOfSkuCostPriceSetting");

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

var setOtherExpensesToSku = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId, reportId, skuIndex, otherExpenses, skuId, year } = req.body;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { updateSkuInListGoods, getSkuFromListGoods } = req.app.locals.goodsCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var updatedReport;
  var previousFinalSkuData = {};

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId, session);
      var { skus, ...totalParams } = report;
      var { skuName } = skus[skuIndex];

      var { skuFromListGoods } = await getSkuFromListGoods(userId, skuId, skuName, session);

      if (skus[skuIndex].otherExpenses === otherExpenses) {
        return res.sendStatus(409);
      }

      if (skus[skuIndex].isCostPriceSet) {
        if (report.crossesTaxYears) {
          previousFinalSkuData.finalProfitInCurrentYear = skus[skuIndex].finalProfitInCurrentYear;
          previousFinalSkuData.finalProfitInNextYear = skus[skuIndex].finalProfitInNextYear;
          previousFinalSkuData.insuranceFeeInCurrentYear = skus[skuIndex].insuranceFeeInCurrentYear;
          previousFinalSkuData.insuranceFeeInNextYear = skus[skuIndex].insuranceFeeInNextYear;
          previousFinalSkuData.otherExpensesInCurrentYear = skus[skuIndex].otherExpensesInCurrentYear;
          previousFinalSkuData.otherExpensesInNextYear = skus[skuIndex].otherExpensesInNextYear;

          skus[skuIndex].otherExpenses = otherExpenses;

          var startYear = +report.dateFrom.split("-")[0];
          var endYear = +report.dateTo.split("-")[0];
          var startYearTaxParams = await getTaxParamsFromDb(userId, startYear, session);
          var endYearTaxParams = await getTaxParamsFromDb(userId, endYear, session);
          var taxParams = { startYearTaxParams, endYearTaxParams };

          var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, report.crossesTaxYears, previousFinalSkuData);
          skus[skuIndex] = result.updatedSku;

          var { startYearTaxParams, endYearTaxParams } = result.taxParams;
          await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
          await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);

          await updateSkuInListGoods(userId, skuId, { metrics: result.updatedSkuMetrics });
        } else {
          previousFinalSkuData.finalProfit = skus[skuIndex].finalProfit;
          previousFinalSkuData.insuranceFee = skus[skuIndex].insuranceFee;
          previousFinalSkuData.otherExpenses = skus[skuIndex].otherExpenses;

          skus[skuIndex].otherExpenses = otherExpenses;
          var taxParams = await getTaxParamsFromDb(userId, year, session);
          var result = await processOfSkuCostPriceSetting(skus[skuIndex], skuFromListGoods, taxParams, null, previousFinalSkuData);

          skus[skuIndex] = result.updatedSku;

          await changeTaxParamsToDb(userId, year, session, result.taxParams);
          await updateSkuInListGoods(userId, skuId, { metrics: result.updatedSkuMetrics });
        }

        updatedReport = await calc.total.restParams(totalParams, skus, report.crossesTaxYears);
      } else {
        var prevSkuOtherExpenses = skus[skuIndex].otherExpenses;
        skus[skuIndex].otherExpenses = otherExpenses;

        var skuMetrics = skuFromListGoods.metrics.find((i) => i.year === year);
        skuMetrics.otherExpenses = skuMetrics.otherExpenses - prevSkuOtherExpenses + otherExpenses;
        await updateSkuInListGoods(userId, skuId, { metrics: skuMetrics });

        var previousTotalOtherExpenses = totalParams.totalOtherExpenses;
        totalParams.totalOtherExpenses = totalParams.totalOtherExpenses - previousTotalOtherExpenses + otherExpenses;

        updatedReport = { ...totalParams, skus };
      }

      await saveUpdatedReport(userId, reportId, updatedReport, session);

      if (skus[skuIndex].isCostPriceSet) {
        var { profitMargin, finalProfit } = skus[skuIndex];
        var { totalFinalProfit, totalProfitMargin, totalInsuranceFee } = updatedReport;

        return res.status(200).json({
          sku: {
            skuIndex,
            data: {
              profitMargin,
              finalProfit,
            },
          },
          total: { totalFinalProfit, totalProfitMargin, totalInsuranceFee },
        });
      } else {
        return res.status(200).json({
          sku: {
            skuIndex,
            data: {
              profitMargin: 0,
              finalProfit: 0,
            },
          },
          total: { totalFinalProfit: 0, totalProfitMargin: 0, totalInsuranceFee: 0 },
        });
      }
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

module.exports = setOtherExpensesToSku;
