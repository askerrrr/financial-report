var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.post(
  "/backround-upload-new-prices-discounts",
  require("./controllers/checkAuth"),
  require("./controllers/uploadTodayPricesAndDiscounts")
);

module.exports = router;
