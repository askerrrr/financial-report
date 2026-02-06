var multer = require("multer");
var { Router } = require("express");
var fileFilter = require("./services/fileFilter");

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getListGoodsPage"));
router.get("/api/:userId", require("./controllers/getListGoodsAndWeeklyPrices"));
router.get("/weekly-prices/:userId", require("./controllers/getWeeklyPricesFile"));
router.get("/download-skus-metrics", require("./controllers/getSkusMetricsFile"));

router.post("/set-price-or-discount", require("./controllers/newPriceApplyController"), require("./controllers/changeWeeklyPricesOrDiscounts"));
router.post("/", require("./controllers/loadListGoods"));
router.post("/change-sku-disable-status", require("./controllers/changeSkuDisableStatus"));
router.post("/upload-prices-discount-file/:userId", upload.single("file"), require("./controllers/uploadPricesAndDiscountsFile"));

module.exports = router;
