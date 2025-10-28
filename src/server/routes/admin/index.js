var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controllers/getAdminAuthPage"));
router.post("/", require("./controllers/checkAuthAdminData"));

module.exports = router;
