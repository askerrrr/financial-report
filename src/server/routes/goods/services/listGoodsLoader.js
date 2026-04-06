import wbapi from "../../reports/services/WBAPI/index.js";
import extractRequiredListGoodsData from "./extractRequiredListGoodsData.js";

var listGoodsLoader = async (userId, token) => {
  var { rawListGoogs } = await wbapi.getListGoods(userId, token);
  var { listGoods } = await extractRequiredListGoodsData(rawListGoogs);

  return { listGoods };
};

export default listGoodsLoader;
