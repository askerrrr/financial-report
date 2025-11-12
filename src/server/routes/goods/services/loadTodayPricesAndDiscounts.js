var getCurrentDayMSK = require('./getCurrentDayMSK');
var wbapi = require('../../reports/services/WBAPI')
var {getAllUserWeeklyPricesAndDiscounts} = require("../../../database/collections/weeklyPricesAndDiscounts");

var loadTodayPricesAndDiscounts = async () => {
    var { currentDayIndex } = getCurrentDayMSK();
    var data = await getAllUserWeeklyPricesAndDiscounts()
    
    for(var {userId, weeklyPricesAndDiscounts } of data) {
        var todayData = weeklyPricesAndDiscounts[currentDayIndex]

        if(todayData){
            console.log({todayData})
        }
    }
};

module.exports = loadTodayPricesAndDiscounts;
