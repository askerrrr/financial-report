var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getOptionsPage"));

router.get("/api", require("./controllers/getUserOptions"));

router.post("/taxrate", require("./controllers/changeTaxRate"));

module.exports = router;
