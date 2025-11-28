var wbapi = require("../../reports/services/WBAPI");
var extractRequiredListGoodsData = require("./extractRequiredListGoodsData");

var listGoodsLoader = async (userId, token) => {
  var { rawListGoogs } = await wbapi.getListGoods(userId, token);
  var { listGoods } = await extractRequiredListGoodsData(rawListGoogs);

  return { listGoods };
};

module.exports = listGoodsLoader;
