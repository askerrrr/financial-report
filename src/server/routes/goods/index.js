var multer = require("multer");
var { Router } = require("express");
var fileFilter = require("./services/fileFilter");

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getListGoodsPage"));
router.get("/api/:userId", require("./controllers/getListGoods"));
router.post("/", require("./controllers/loadListGoods"));
router.post("/change-prices-discounts/:userId", require("./controllers/changePricesAndDiscounts"));
router.post(
  "/upload-prices-discount-file/:userId",
  upload.single("file"),
  require("./controllers/uploadPricesAndDiscountsFile")
);

module.exports = router;
