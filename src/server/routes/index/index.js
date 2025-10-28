var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getMainPage"));
router.get("/api/:userId", require("./controllers/getLastReportsAndTree"));
router.get("/api/required-reports/:userId", require("./controllers/getReports"));

module.exports = router;
