var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getIndexHTML"));
router.get("/api/:userId", require("./controllers/getReportsData"));

module.exports = router;
