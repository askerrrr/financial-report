var changeElementInArray = require("../services/changeElementInArray");

var changeReportDetail = async (req, res, next) => {
  var { updateItems, getReportById } =
    req.app.locals.reportCollectionServices();

  var { userId, reportId } = req.body;
  console.log(req.body);
  var { items } = await getReportById(userId, reportId);

  var changedItems = await changeElementInArray(items, req.body);

  var result = await updateItems(userId, reportId, changedItems);

  res.sendStatus(200);
};

module.exports = changeReportDetail;
