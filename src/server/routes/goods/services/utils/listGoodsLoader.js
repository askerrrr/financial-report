import wbapi from "../../../reports/services/utils/WBAPI/index.js";
import extractRequiredListGoodsData from "./extractRequiredListGoodsData.js";

var listGoodsLoader = async (userId, token) => {
  var { rawListGoogs } = await wbapi.getListGoods(userId, token);
  var { listGoods } = extractRequiredListGoodsData(rawListGoogs);

  return { listGoodsFromWBAPI: listGoods };
};

export default listGoodsLoader;
