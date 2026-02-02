var { dbClient } = require("../../../database");
var getTaxParamKeyName = require("../services/getTaxParamKeyName");
var defaultTaxParams = require("../../../database/defaultTaxParams");
var recalculateReportsWithNewTaxRate = require("../services/recalculateReportsWithNewTaxRate");
var recalculateReportsWithNewMandatoryInsuranceRate = require("../services/recalculateReportsWithNewMandatoryInsuranceRate");

var changeTaxParams = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { year, oldTaxParams, recalculate, data } = req.body;
  var { changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;
  var { getListGoodsFromDb, saveListGoodsToDb } = req.app.locals.goodsCollectionServices;
  var { getReportsByUserId, saveUpdatedReports } = req.app.locals.reportCollectionServices;

  var { taxParamKeyName } = getTaxParamKeyName(data);

  if (!recalculate) {
    try {
      await changeTaxParamsToDb(userId, year, null, data);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(304);
    }

    return;
  }

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { listGoods } = await getListGoodsFromDb(userId, session);
      var { reports } = await getReportsByUserId(userId, session);
      var requiredReports = reports.filter((report) => report.recordTo.year == year);

      switch (taxParamKeyName) {
        case "taxRate":
          var newTaxRate = data[taxParamKeyName];

          if (requiredReports.length) {
            var resetPaidTaxAmount = -oldTaxParams.mandatoryInsuranceFee;

            var { updatedReports, finalProfit, paidTaxAmount, listGoodsWithUpdatedSkuMetrics } = recalculateReportsWithNewTaxRate(
              requiredReports,
              listGoods,
              resetPaidTaxAmount,
              newTaxRate,
              year
            );

            await saveUpdatedReports(userId, updatedReports, session);
            await saveListGoodsToDb(userId, listGoodsWithUpdatedSkuMetrics, session);
            await changeTaxParamsToDb(userId, year, session, { finalProfit, paidTaxAmount, taxRate: newTaxRate });
          } else {
            await changeTaxParamsToDb(userId, year, session, { taxRate: newTaxRate });
          }

          break;
        case "mandatoryInsuranceFeeRate":
          var newMandatoryInsuranceFeeRate = data[taxParamKeyName];

          if (requiredReports.length) {
            var { mandatoryInsuranceFee } = oldTaxParams;
            var { updatedReports, ...updatedTaxParams } = recalculateReportsWithNewMandatoryInsuranceRate(
              year,
              requiredReports,
              listGoods,
              mandatoryInsuranceFee,
              newMandatoryInsuranceFeeRate,
              listGoodsWithUpdatedSkuMetrics
            );

            await saveUpdatedReports(userId, updatedReports, session);
            await changeTaxParamsToDb(userId, year, session, updatedTaxParams);
          } else {
            await changeTaxParamsToDb(userId, year, session, { mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate });
          }

          break;
        case "mandatoryInsuranceFee":
          var newMandatoryInsuranceFee = data[taxParamKeyName];

          break;
      }
    });

    res.sendStatus(200);
  } catch (e) {
    console.log({ e });
    res.sendStatus(304);
  } finally {
    if (session && session.inTransaction()) {
      await session.endSession();
    }
  }
};

module.exports = changeTaxParams;
