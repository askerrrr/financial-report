var calc = require("../services/calcServices");
var { connection } = require("../../../database");
var updateSkuInArray = require("../services/different/updateSkuInArray");

var setCostPriceToSKU = async (req, res, next) => {
  var { userId, reportId, skuIndex, costPrice, year } = req.body;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await connection.startSession();

  try {
    var taxParams = await getTaxParamsFromDb(userId, year);
    var { report } = await getReportById(userId, reportId);
    var { skus, ...totalParams } = report;

    var { updatedSKUS, updatedSKU } = updateSkuInArray(skus, req.body);

    var { skuWithCalculatedParams, insuranceFeePercentage, recalculatedPaidInsuranceFee } = calc.sku.restParams(updatedSKU, costPrice, taxParams);
    var updatedTaxParams = { insuranceFeePercentage, paidInsuranceFee: recalculatedPaidInsuranceFee };
    updatedSKUS[skuIndex] = skuWithCalculatedParams;

    var updatedReport = await calc.total.restParams(totalParams, updatedSKUS);

    await session.withTransaction(async () => {
      await saveUpdatedReport(userId, reportId, updatedReport, session);
      await changeTaxParamsToDb(userId, year, session, updatedTaxParams);
    });

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
  } catch (err) {
    //log error
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = setCostPriceToSKU;
