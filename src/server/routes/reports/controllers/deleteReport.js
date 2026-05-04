import Joi from "joi";
import { dbClient } from "../../../database/index.js";
import recalculateSkuMetricsAfterReportDeletion from "../services/different/recalculateSkuMetricsAfterReportDeletion.js";

var schema = Joi.object({ reportId: Joi.number().required() });

var deleteReport = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { reportId } = req.body;
  var { userId } = req.app.locals;
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { getListGoodsFromDb, saveListGoodsToDb } = req.app.locals.goodsCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await dbClient.startSession();
  try {
    await session.withTransaction(async () => {
      var { listGoods } = await getListGoodsFromDb(userId, session);

      var report = await deleteReportFromDb(userId, reportId, session);
      var { year, month } = report.recordTo;
      var startYear = +report.dateFrom.split("-")[0];
      var endYear = +report.dateTo.split("-")[0];

      if (report.crossesTaxYears) {
        var currentYearPropPostfix = "InCurrentYear";
        var nextYearPropPostfix = "InNextYear";

        var taxParams = await getTaxParamsFromDb(userId, null, session);
        var startYearTaxParams = taxParams.find((params) => params.year === startYear);
        var endYearTaxParams = taxParams.find((params) => params.year === endYear);

        startYearTaxParams = recalculateTaxParams(startYearTaxParams, report, currentYearPropPostfix).updatedTaxParams;
        endYearTaxParams = recalculateTaxParams(endYearTaxParams, report, nextYearPropPostfix).updatedTaxParams;
        await changeTaxParamsToDb(userId, session, startYearTaxParams, endYearTaxParams);
      } else {
        var taxParams = await getTaxParamsFromDb(userId, year, session);
        var { updatedTaxParams } = recalculateTaxParams(taxParams, report);
        await changeTaxParamsToDb(userId, session, updatedTaxParams);
      }

      var { listGoodsWithRecalculatedSkuMetrics } = recalculateSkuMetricsAfterReportDeletion(startYear, endYear, listGoods, report);

      await saveListGoodsToDb(userId, listGoodsWithRecalculatedSkuMetrics, session);
      await deleteReportFromReportTree(userId, year, month, reportId, session);
    });

    return res.sendStatus(200);
  } catch (e) {
    console.log({ e });
    res.sendStatus(304);
  } finally {
    await session.endSession();
  }
};

export default deleteReport;

var recalculateTaxParams = function (taxParams, report, propPostfix = "") {
  if (report["totalFinalProfit" + propPostfix]) {
    taxParams.finalProfit = +(taxParams.finalProfit - report["totalFinalProfit" + propPostfix]).toFixed(2);
    taxParams.paidInsuranceFee = +(taxParams.paidInsuranceFee - report["totalInsuranceFee" + propPostfix]).toFixed(2);
  }

  taxParams.paidTaxAmount = +(taxParams.paidTaxAmount - report["totalTaxAmount" + propPostfix]).toFixed(2);
  taxParams.retailAmount = +(taxParams.retailAmount - report["totalRetailAmount" + propPostfix]).toFixed(2);
  taxParams.taxableAmount = +(taxParams.taxableAmount - report["totalTaxableAmount" + propPostfix]).toFixed(2);
  taxParams.additionalInsuranceFee = +(taxParams.additionalInsuranceFee - report["totalAdditionalInsuranceFee" + propPostfix]).toFixed(2);
  return { updatedTaxParams: taxParams };
};
