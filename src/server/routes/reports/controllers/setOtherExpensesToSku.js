var Joi = require("joi");
var calc = require("../services/calcServices");
var { dbClient } = require("../../../database");

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

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId, session);
      var { skus, ...totalParams } = report;
      var { skuName } = skus[skuIndex];

      var { skuFromListGoods } = await getSkuFromListGoods(userId, skuId, skuName, session);

      if (skus[skuIndex].costPrice === costPrice) {
        return res.sendStatus(409);
      }

      skus[skuIndex].costPrice = costPrice;

      if (report.crossesTaxYears) {
      } else {
      }

      res.json({
        sku: {
          skuIndex,
          data: {
            profitMargin,
            finalProfit,
          },
        },
        total: { totalFinalProfit, totalProfitMargin, totalInsuranceFee },
      });
    });
  } catch (e) {
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }

  console.log(req.body);
  res.sendStatus(200);
};

module.exports = setOtherExpensesToSku;
