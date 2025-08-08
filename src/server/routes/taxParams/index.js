var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getTaxParamsPage"));

router.get("/api", require("./controllers/getTaxParams"));

router.get("/years", require("./controllers/getReportYears"));

router.post(
  "/taxrate",
  require("./controllers/changeTaxRate"),
  require("./controllers/recalculateReportsParamsAfterChangingTaxRate")
);

router.post(
  "/insurance-fee-percentage",
  require("./controllers/changeInsuranceFeePercentage"),
  require("./controllers/recalculateReportsParamsAfterChangingInsuranceFeePergentage")
);

router.post(
  "/mandatory-insurance-premiums",
  require("./controllers/changeMandatoryInsuranceFee"),
  require("./controllers/recalculateReportsParamsAfterChangingMandatoryInsuranceFee")
);

module.exports = router;
