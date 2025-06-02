var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.post("/", require("./controllers/updateToken"));

router.get("/exist", require("./controllers/checkTokenExists"));

module.exports = router;
