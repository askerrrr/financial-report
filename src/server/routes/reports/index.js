var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:id", require("./controllers/getReport"));

module.exports = router;
