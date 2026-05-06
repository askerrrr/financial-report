import multer from "multer";
import { Router } from "express";
import fileFilter from "./services/fileFilter/index.js";
import getListGoods from "./controllers/getListGoods.js";
import loadListGoods from "./controllers/loadListGoods.js";
import getListGoodsPage from "./controllers/getListGoodsPage.js";
import getSkusMetricsFile from "./controllers/getSkusMetricsFile.js";
import getWeeklyPricesFile from "./controllers/getWeeklyPricesFile.js";
import changeSkuDisableStatus from "./controllers/changeSkuDisableStatus.js";
import newPriceApplyController from "./controllers/newPriceApplyController.js";
import getListGoodsAndWeeklyPrices from "./controllers/getListGoodsAndWeeklyPrices.js";
import downloadPricesAndDiscountsFile from "./controllers/downloadPricesAndDiscountsFile.js";
import changeWeeklyPricesOrDiscounts from "./controllers/changeWeeklyPricesOrDiscounts.js";

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getListGoodsPage);
router.get("/listgoodsonly/:userId", getListGoods);
router.get("/api/:userId", getListGoodsAndWeeklyPrices);
router.get("/weekly-prices/:userId", getWeeklyPricesFile);
router.get("/download-skus-metrics", getSkusMetricsFile);

router.post("/set-price-or-discount", newPriceApplyController, changeWeeklyPricesOrDiscounts);
router.post("/", loadListGoods);
router.post("/change-sku-disable-status", changeSkuDisableStatus);
router.post("/upload-prices-discount-file/:userId", upload.single("file"), downloadPricesAndDiscountsFile);

export default router;
