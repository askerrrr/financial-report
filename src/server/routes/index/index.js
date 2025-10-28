var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getMainPage"));
router.get("/api/:userId", require("./controllers/getLastReportsAndTree"));

module.exports = router;
