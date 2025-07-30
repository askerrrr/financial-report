var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getTaxParamsPage"));

router.get("/api", require("./controllers/getTaxParams"));

router.post(
  "/taxrate",
  require("./controllers/changeTaxRate"),
  require("./controllers/recalculateReportsTaxRate")
);

router.post(
  "/insurance-fee-percentage",
  require("./controllers/changeInsuranceFeePercentage")
);

router.post(
  "/mandatory-insurance-premiums",
  require("./controllers/changeMandatoryInsuranceFee")
);

module.exports = router;
