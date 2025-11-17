var wbapi = {};

wbapi.getReports = require("./reports");
wbapi.getListGoods = require("./goods/goodsInfo/getGoodsListFromWBAPI");
wbapi.setPricesAndDiscounts = require("./goods/pricesAndDiscounts/setPriceAndDiscount");
wbapi.gestProcessedPricingInfo = require("./goods/pricesAndDiscounts/getProcessedPricingInfo");
wbapi.getPriceUploadDetails = require("./goods/pricesAndDiscounts/getPriceUploadDetails");
wbapi.getPricesAndDiscountsByListGoods = require("./goods/pricesAndDiscounts/getPricesAndDiscountsByListGoods");
module.exports = wbapi;
