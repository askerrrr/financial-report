import loadListGoodsSchema from "./loadListGoods.js";
import changeSkuDisableStatusSchema from "./changeSkuDisableStatus.js";
import setNewPricesAndDiscountsToSkuSchema from "./setNewPricesAndDiscountsToSku.js";

var schemas = {};

schemas.loadListGoods = loadListGoodsSchema;
schemas.changeSkuDisableStatus = changeSkuDisableStatusSchema;
schemas.setNewPricesAndDiscountsToSku = setNewPricesAndDiscountsToSkuSchema;

export default schemas;
