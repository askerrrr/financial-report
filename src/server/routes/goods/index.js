var { Router } = require("express");

var router = Router();

router.get("/", require("./controllers/getListGoodsPage"));
router.get("/api/:userId", require("./controllers/getListGoods"));
router.post("/", require("./controllers/loadListGoods"));

module.exports = router;
