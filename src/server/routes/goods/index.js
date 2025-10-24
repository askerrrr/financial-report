var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getListGoodsPage"));
router.get("/api", require("./controllers/getListGoods"));
router.post("/", require('./controllers/loadListGoodss'))

module.exports = router;
