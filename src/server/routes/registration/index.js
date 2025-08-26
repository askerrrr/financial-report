var { Router } = require("express");
var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controller/getRegistrationFormPage"));

router.post("/new", require("./controller/createUser"));

module.exports = router;
