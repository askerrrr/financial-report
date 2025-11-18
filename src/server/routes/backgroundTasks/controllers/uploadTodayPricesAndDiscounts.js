var wbapi = require("../../reports/services/WBAPI");
var getCurrentDayMSK = require("../services/getCurrentDayMSK");

var uploadTodayPricesAndDiscounts = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;
  var { getAllUserWeeklyPricesAndDiscounts, setUploadId } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getAllUserWeeklyPricesAndDiscounts();

  for (var { userId, weeklyPricesAndDiscounts } of data) {
    if (!weeklyPricesAndDiscounts.length) {
      continue;
    }

    var currentDayData = weeklyPricesAndDiscounts[currentDayIndex];

    if (currentDayData) {
      var token = await getWBTokenByUserId(userId);

      var { id } = await wbapi.setPricesAndDiscounts(userId, token, currentDayData);
      await setUploadId(userId, id);
    }
  }

  return res.sendStatus(200);
};

module.exports = uploadTodayPricesAndDiscounts;
