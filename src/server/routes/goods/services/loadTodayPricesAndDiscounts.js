var getCurrentDayMSK = require("./getCurrentDayMSK");
var wbapi = require("../../reports/services/WBAPI");
var { getWBTokenByUserId } = require("../../../database/collections/tokens");
var { getAllUserWeeklyPricesAndDiscounts } = require("../../../database/collections/weeklyPricesAndDiscounts");

var loadTodayPricesAndDiscounts = async () => {
  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getAllUserWeeklyPricesAndDiscounts();

  for (var { userId, weeklyPricesAndDiscounts } of data) {
    var currentDayData = weeklyPricesAndDiscounts[currentDayIndex];

    if (currentDayData) {
      var token = await getWBTokenByUserId(userId);
      console.log({ userId, token });
      //await wbapi.setPricesAndDiscounts(userId, token, currentDayData);
    }
  }
};

module.exports = loadTodayPricesAndDiscounts;
