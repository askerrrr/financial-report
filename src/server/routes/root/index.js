var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getIndexHTML"));
router.get("/api", require("./controllers/getReportData"));

module.exports = router;
