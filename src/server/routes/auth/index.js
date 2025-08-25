var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getAuthFormPage"));

router.post("/check", require("./controllers/checkUserCredentials"));

module.exports = router;
