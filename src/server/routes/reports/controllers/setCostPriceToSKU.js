var calc = require("../services/calcServices");
var { connection } = require("../../../database");
var updateSkuInArray = require("../services/different/updateSkuInArray");

var setCostPriceToSKU = async (req, res, next) => {
  var { userId, reportId, skuIndex, costPrice, skuId, year } = req.body;
  var { updateSkuLastCostPrice } = req.app.locals.goodsCollectionServices;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await connection.startSession();

  try {
    var taxParams = await getTaxParamsFromDb(userId, year);
    var { report } = await getReportById(userId, reportId);
    var { skus, ...totalParams } = report;

    var { updatedSKUS, updatedSKU } = updateSkuInArray(skus, skuIndex, costPrice);

    var { skuWithCalculatedParams, insuranceFeePercentage, recalculatedPaidInsuranceFee } = calc.sku.restParams(updatedSKU, taxParams);
    var updatedTaxParams = { insuranceFeePercentage, paidInsuranceFee: recalculatedPaidInsuranceFee };
    updatedSKUS[skuIndex] = skuWithCalculatedParams;

    var updatedReport = await calc.total.restParams(totalParams, updatedSKUS);

    await session.withTransaction(async () => {
      await saveUpdatedReport(userId, reportId, updatedReport, session);
      await changeTaxParamsToDb(userId, year, session, updatedTaxParams);
      await updateSkuLastCostPrice(userId, skuId, costPrice, session);
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
    console.log({ err });
    //log error
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = setCostPriceToSKU;
