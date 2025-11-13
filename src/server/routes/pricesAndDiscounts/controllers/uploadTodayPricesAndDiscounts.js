var wbapi = require("../../reports/services/WBAPI");
var getCurrentDayMSK = require("../services/getCurrentDayMSK");

var uploadTodayPricesAndDiscounts = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;
  var { getAllUserWeeklyPricesAndDiscounts, setUploadId } =
    req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getAllUserWeeklyPricesAndDiscounts();

  for (var { userId, weeklyPricesAndDiscounts } of data) {
    var currentDayData = weeklyPricesAndDiscounts[currentDayIndex];

    if (currentDayData) {
      var token = await getWBTokenByUserId(userId);
      console.log({ userId, token });
      var { id } = await wbapi.setPricesAndDiscounts(userId, token, currentDayData);
      await setUploadId(userId, id);
    }
  }
};

module.exports = uploadTodayPricesAndDiscounts;
