var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getMainPage"));
router.get("/api/:userId", require("./controllers/getLastReportsAndTree"));
router.post("/api/required-reports/", require("./controllers/getReports"));

module.exports = router;
