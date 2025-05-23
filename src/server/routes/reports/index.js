var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/:id", require("./controllers/getReportHTML"));

router.get("/:userId/:id", require("./controllers/getReport"));

router.post("/change", require("./controllers/changeReportDetail"));

module.exports = router;
