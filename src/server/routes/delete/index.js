var { Router } = require("express");

var router = Router({ caseSensitive: true, strict: true });

router.delete("/user", require("./controllers/deleteUser"));
router.delete("/users", require("./controllers/deleteUsers"));

module.exports = router;
