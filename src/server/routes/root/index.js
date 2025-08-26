var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getMainPage"));
router.get("/api/:userId", require("./controllers/getReportsData"));

module.exports = router;
