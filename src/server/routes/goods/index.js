var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getListGoodsPage"));

module.exports = router;
