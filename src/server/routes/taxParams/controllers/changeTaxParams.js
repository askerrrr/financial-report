import Joi from "joi";
import { dbClient } from "../../../database/index.js";
import getTaxParamKeyName from "../services/getTaxParamKeyName.js";
import defaultTaxParams from "../../../database/defaultTaxParams.js";
import recalculateReportsWithNewTaxRate from "../services/recalculateReportsWithNewTaxRate.js";
import recalculateReportsWithNewMandatoryInsuranceRate from "../services/recalculateReportsWithNewMandatoryInsuranceRate.js";

var dataObjectSchema = Joi.object({ taxRate: Joi.number(), mandatoryInsuranceFeeRate: Joi.number(), mandatoryInsuranceFee: Joi.number() });

var oldTaxParamsObjectSchema = Joi.object({
  year: Joi.number(),
  taxRate: Joi.number(),
  paidTaxAmount: Joi.number(),
  mandatoryInsuranceFee: Joi.number(),
  insuranceFeePercentage: Joi.number(),
  paidInsuranceFee: Joi.number(),
  retailAmount: Joi.number(),
  finalProfit: Joi.number(),
  isInsuranceFeePaid: Joi.boolean(),
  additionalInsuranceFee: Joi.number(),
  requiresAdditionalInsuranceFee: Joi.boolean(),
  excessIncomeForAdditionalInsuranceFee: Joi.number(),
  maxInsuranceFee: Joi.number(),
  mandatoryInsuranceFeeRate: Joi.number(),
  hasExcessIncomeForInsurance: Joi.boolean(),
  mandatoryInsuranceFeeIsPaid: Joi.boolean(),
  additionalInsuranceFeeIsPaid: Joi.boolean(),
  excessInsuranceRate: Joi.number(),
  schemaVersion: Joi.number(),
  taxableAmount: Joi.number().required(),
});

var schema = Joi.object({
  year: Joi.number().required(),
  reportsNeedRecalculation: Joi.boolean().required(),
  data: dataObjectSchema,
  oldTaxParams: oldTaxParamsObjectSchema,
});

var changeTaxParams = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var userId = req.app.locals.userId;
  var { year, oldTaxParams, reportsNeedRecalculation, data } = req.body;
  var { changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;
  var { getListGoodsFromDb, saveListGoodsToDb } = req.app.locals.goodsCollectionServices;
  var { getReportsByUserId, saveUpdatedReports } = req.app.locals.reportCollectionServices;

  var { taxParamKeyName } = getTaxParamKeyName(data);

  if (!reportsNeedRecalculation) {
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
      var requiredReports = reports.filter((report) => {
        if (report.crossesTaxYears) {
          var startYear = +report.dateFrom.split("-")[0];
          var endYear = +report.dateTo.split("-")[0];
          if (startYear === year || endYear === year) {
            return report;
          }
        } else {
          if (report.recordTo.year === year) {
            return report;
          }
        }
      });

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
              year,
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
            var { updatedReports, listGoodsWithUpdatedSkuMetrics, finalProfit, paidInsuranceFee, mandatoryInsuranceFeeIsPaid } =
              recalculateReportsWithNewMandatoryInsuranceRate(year, requiredReports, listGoods, mandatoryInsuranceFee, newMandatoryInsuranceFeeRate);

            await saveUpdatedReports(userId, updatedReports, session);

            await changeTaxParamsToDb(userId, year, session, {
              paidInsuranceFee,
              mandatoryInsuranceFeeIsPaid,
              mandatoryInsuranceFeeRate: newMandatoryInsuranceFeeRate,
            });
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

export default changeTaxParams;
