var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.post(
  "/backround-upload-new-prices-discounts",
  require("./controllers/checkAuth"),
  require("./controllers/uploadTodayPricesAndDiscounts")
);

router.post(
  "/backround-get-current",
  require("./controllers/checkAuth"),
  require("./controllers/updateDataIntoListGoods")
);

router.post(
  "/check-processing-of-prices-discounts",
  require("./controllers/checkAuth"),
  require("./controllers/checkProcessingOfPricesAndDiscounts")
);

module.exports = router;
