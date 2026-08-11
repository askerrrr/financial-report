import loadListGoodsSchema from "./loadListGoods.js";
import changeSkuDisableStatusSchema from "./changeSkuDisableStatus.js";
import setNewPricesAndDiscountsToSkuSchema from "./setNewPricesAndDiscountsToSku.js";
import changeStatusOfParticipationInPromoSchema from "./changeStatusOfParticipationInPromo.js";
var schemas = {};

schemas.loadListGoods = loadListGoodsSchema;
schemas.changeSkuDisableStatus = changeSkuDisableStatusSchema;
schemas.setNewPricesAndDiscountsToSku = setNewPricesAndDiscountsToSkuSchema;
schemas.changeStatusOfParticipationInPromo = changeStatusOfParticipationInPromoSchema;

export default schemas;
