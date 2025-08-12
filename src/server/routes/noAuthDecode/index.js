var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getNoAuthDecodePage"));

router.get("/report/:id", require("./controllers/getReportPage"));

router.get("/api/report/:id", require("./controllers/getReport"));

router.post("/", require("./controllers/getReportFromWBAPI"));

module.exports = router;
