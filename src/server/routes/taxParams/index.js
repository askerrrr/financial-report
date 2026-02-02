var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getTaxParamsPage"));

router.get("/api", require("./controllers/getTaxParams"));

router.get("/years", require("./controllers/getReportYears"));

router.post("/change", require("./controllers/changeTaxParams"));

module.exports = router;
