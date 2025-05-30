var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.post("/", require("./controllers/updateToken"));

module.exports = router;
