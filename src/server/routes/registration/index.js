var { Router } = require("express");
var router = Router({ caseSensitive: true, strict: true });

router.get("/", require("./controller/getRegistrationFormFIle"));

router.post("/new", require("./controller/createUser"));

module.exports = router;
