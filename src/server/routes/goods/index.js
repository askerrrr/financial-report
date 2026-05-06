import multer from "multer";
import { Router } from "express";
import fileFilter from "./services/fileFilter/index.js";
import getListGoods from "./controllers/getListGoods.js";
import loadListGoods from "./controllers/loadListGoods.js";
import getListGoodsPage from "./controllers/getListGoodsPage.js";
import getSkusMetricsFile from "./controllers/getSkusMetricsFile.js";
import getWeeklyPricesFile from "./controllers/getWeeklyPricesFile.js";
import changeSkuDisableStatus from "./controllers/changeSkuDisableStatus.js";
import setNewPricesAndDiscountsToSku from "./controllers/setNewPricesAndDiscountsToSku.js";
import getListGoodsAndWeeklyPrices from "./controllers/getListGoodsAndWeeklyPrices.js";
import uploadPricesAndDiscountsFile from "./controllers/uploadPricesAndDiscountsFile.js";
import changeWeeklyPricesOrDiscounts from "./controllers/changeWeeklyPricesOrDiscounts.js";

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getListGoodsPage);
router.get("/listgoodsonly/:userId", getListGoods);
router.get("/metrics/download", getSkusMetricsFile);
router.get("/api/:userId", getListGoodsAndWeeklyPrices);
router.get("/prices-discounts/file/:userId", getWeeklyPricesFile);

router.post("/", loadListGoods);
router.post("/sku-disable-status", changeSkuDisableStatus);
router.post("/prices-discounts/download/:userId", upload.single("file"), uploadPricesAndDiscountsFile);
router.post("/prices-discounts/upload", setNewPricesAndDiscountsToSku, changeWeeklyPricesOrDiscounts);

export default router;
