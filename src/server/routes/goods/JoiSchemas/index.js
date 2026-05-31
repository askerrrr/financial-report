import loadListGoodsSchema from "./loadListGoods.js";
import changeSkuDisableStatusSchema from "./changeSkuDisableStatus.js";
import uploadPricesAndDiscountsFileSchema from "./uploadPricesAndDiscountsFile.js";
import setNewPricesAndDiscountsToSkuSchema from "./setNewPricesAndDiscountsToSku.js";

var schemas = {};

schemas.loadListGoods = loadListGoodsSchema;
schemas.changeSkuDisableStatus = changeSkuDisableStatusSchema;
schemas.uploadPricesAndDiscountsFile = uploadPricesAndDiscountsFileSchema;
schemas.setNewPricesAndDiscountsToSku = setNewPricesAndDiscountsToSkuSchema;

export default schemas;
