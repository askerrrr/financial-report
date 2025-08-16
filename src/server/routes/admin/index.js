var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getAdminAuthPage"));
router.post("/", require("./controllers/checkAuthAdminData"));

module.exports = router;
