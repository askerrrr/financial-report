var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getDecodeReportWithoutRegistrationPage"));

router.get("/report/:id", require("./controllers/getReportPage"));

router.get("/xlsx/:id/:reportId", require("./controllers/downloadReportAsXLSX"));

router.post("/", require("./controllers/getReportFromWBAPI"));

router.post("/report/set-cost-price", require("./controllers/setCostPrice"));

module.exports = router;
