var calc = require("../services/calcServices");
var { connection } = require("../../../database");
var setCostPriceToSkuBySkuIndex = require("../services/different/setCostPriceToSkuBySkuIndex");

var setCostPriceToSku = async (req, res, next) => {
  var { userId, reportId, skuIndex, costPrice, skuId, year } = req.body;
  var { updateSkuLastCostPrice } = req.app.locals.goodsCollectionServices;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await connection.startSession();

  try {
    var taxParams = await getTaxParamsFromDb(userId, year);
    var { report } = await getReportById(userId, reportId);
    var { skus, ...totalParams } = report;

    var { updatedSKUS, updatedSKU } = setCostPriceToSkuBySkuIndex(skus, skuIndex, costPrice);

    await session.withTransaction(async () => {
      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];
        var startYearTaxParams = await getTaxParamsFromDb(userId, startYear);
        var endYearTaxParams = await getTaxParamsFromDb(userId, endYear);

        var resultOfStartYearUpdation = calc.sku.restParams(
          updatedSKU,
          startYearTaxParams,
          "InCurrentYear"
        );

        await changeTaxParamsToDb(
          userId,
          startYear,
          session,
          resultOfStartYearUpdation.updatedTaxParams
        );

        updatedSKU = resultOfStartYearUpdation.skuWithCalculatedParams;

        var resultOfEndYearUpdation = calc.sku.restParams(
          updatedSKU,
          endYearTaxParams,
          "InNextYear"
        );

        await changeTaxParamsToDb(
          userId,
          endYear,
          session,
          resultOfEndYearUpdation.updatedTaxParams
        );
        var { skuWithCalculatedParams } = resultOfEndYearUpdation;
        skuWithCalculatedParams.finalProfit =
          skuWithCalculatedParams.finalProfitInCurrentYear +
          skuWithCalculatedParams.finalProfitInNextYear;

        skuWithCalculatedParams.insuranceFee =
          skuWithCalculatedParams.insuranceFeeInCurrentYear +
          skuWithCalculatedParams.insuranceFeeInNextYear;

        skuWithCalculatedParams.profitMargin =
          (skuWithCalculatedParams.profitMarginInCurrentYear =
            skuWithCalculatedParams.profitMarginInNextYear) / 2;
      } else {
        var { skuWithCalculatedParams, updatedTaxParams } = calc.sku.restParams(
          updatedSKU,
          taxParams
        );

        await changeTaxParamsToDb(userId, year, session, updatedTaxParams);
      }

      updatedSKUS[skuIndex] = skuWithCalculatedParams;

      var updatedReport = await calc.total.restParams(
        totalParams,
        updatedSKUS,
        report.crossesTaxYears
      );

      await saveUpdatedReport(userId, reportId, updatedReport, session);
      await updateSkuLastCostPrice(userId, skuId, costPrice, session);
      var { totalFinalProfit, totalProfitMargin } = updatedReport;
      var { profitMargin, finalProfit } = skuWithCalculatedParams;

      res.json({
        sku: {
          skuIndex,
          data: {
            profitMargin,
            finalProfit,
          },
        },
        total: { totalFinalProfit, totalProfitMargin },
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

module.exports = setCostPriceToSku;
