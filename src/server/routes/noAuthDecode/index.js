var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getNoAuthDecodeHTML"));

module.exports = router;
