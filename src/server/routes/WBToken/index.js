var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.post("/", require("./controllers/saveWBToken"));

router.get("/exist/:userId", require("./controllers/checkTokenExists"));

module.exports = router;
