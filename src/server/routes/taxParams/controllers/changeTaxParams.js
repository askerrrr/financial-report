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
      var reportsData = await getReportsByUserId(userId, session);
      var reports = reportsData.reports.filter((report) => report.recordTo.year == year);

      switch (taxParamKeyName) {
        case "taxRate":
          var newTaxRate = data[taxParamKeyName];
          var resetPaidTaxAmount = -oldTaxParams.mandatoryInsuranceFee;

          var { reports, finalProfit, paidTaxAmount, listGoodsWithUpdatedSkuMetrics } = recalculateReportsWithNewTaxRate(
            reports,
            listGoods,
            resetPaidTaxAmount,
            newTaxRate,
            year,
          );

          await saveUpdatedReports(userId, reports, session);
          await changeTaxParamsToDb(userId, year, session, { finalProfit, paidTaxAmount, taxRate: newTaxRate });
          await saveListGoodsToDb(userId, listGoodsWithUpdatedSkuMetrics, session);

          break;
        case "mandatoryInsuranceFeeRate":
          var { mandatoryInsuranceFee } = oldTaxParams;
          var newMandatoryInsuranceRate = data[taxParamKeyName];
          var { reports, ...updatedTaxParams } = recalculateReportsWithNewMandatoryInsuranceRate(
            year,
            reports,
            listGoods,
            mandatoryInsuranceFee,
            newMandatoryInsuranceRate,
            listGoodsWithUpdatedSkuMetrics,
          );

          await saveUpdatedReports(userId, reports, session);
          await changeTaxParamsToDb(userId, year, session, updatedTaxParams);

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
