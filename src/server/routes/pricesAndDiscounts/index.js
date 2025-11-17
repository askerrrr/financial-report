var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.post(
  "/background-upload-new-prices-discounts",
  require("./controllers/checkAuth"),
  require("./controllers/uploadTodayPricesAndDiscounts")
);

router.post(
  "/background-get-current",
  require("./controllers/checkAuth"),
  require("./controllers/updateDataIntoListGoods")
);

router.post(
  "/check-processing-of-prices-discounts",
  require("./controllers/checkAuth"),
  require("./controllers/checkProcessingOfPricesAndDiscounts")
);

module.exports = router;
