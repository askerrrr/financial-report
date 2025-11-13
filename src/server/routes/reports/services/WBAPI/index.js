var wbapi = {};

wbapi.getReports = require("./reports");
wbapi.getListGoods = require("./goods/goodsInfo/getGoodsListFromWBAPI");
wbapi.setPricesAndDiscounts = require("./goods/pricesAndDiscounts/setPriceAndDiscount");
wbapi.gestProcessedPricingInfo = require("./goods/pricesAndDiscounts/getProcessedPricingInfo");
wbapi.updatePricesAndDiscountsByListGoods = require("./goods/pricesAndDiscounts/updatePricesAndDiscountsByListGoods");
module.exports = wbapi;
