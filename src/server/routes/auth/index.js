var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getAuthFormFile"));

router.post("/check", require("./controllers/checkUserCredentials"));

module.exports = router;
