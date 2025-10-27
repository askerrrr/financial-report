var { join } = require("node:path");

var getListGoodsPage = async (req, res, next) => res.sendFile(join(__dirname, "../../../../public/html/goods/index.html"));

module.exports = getListGoodsPage;
