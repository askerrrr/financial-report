var changeElementInArray = require("../services/differentServices/changeElementInArray");
var calcRemainingParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/calcRemainingParams");

var changeReportDetail = async (req, res, next) => {
  var { updateItems, getReportById } =
    req.app.locals.reportCollectionServices();

  var { userId, reportId } = req.body;

  var { items } = await getReportById(userId, reportId);

  var changedItems = await changeElementInArray(items, req.body);

  var item = changedItems[req.body.index];

  var itemWithCalculatedParams = await calcRemainingParams(
    item,
    +req.body.value
  );

  changedItems[req.body.index] = itemWithCalculatedParams;

  var successUpdate = await updateItems(userId, reportId, changedItems);

  if (successUpdate) {
    var {
      netProfitMargin,
      finalNetProfitPerItem,
      averageFinalNetProfitPerItem,
    } = itemWithCalculatedParams;

    return res.status(200).json({
      netProfitMargin,
      finalNetProfitPerItem,
      averageFinalNetProfitPerItem,
      index: req.body.index,
    });
  }

  res.sendStatus(304);
};

module.exports = changeReportDetail;
