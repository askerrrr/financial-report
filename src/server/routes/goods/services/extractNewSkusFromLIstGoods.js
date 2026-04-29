var extractNewSkusFromLIstGoods = (listGoodsFromWBAPI, listGoodsFromDb) => {
  var newSkus = [];

  for (var { id, skuName } of listGoodsFromWBAPI) {
    var listGoodsFilteredBySkuId = listGoodsFromDb.filter((item) => item.id === id);
    var skuIsExist = listGoodsFilteredBySkuId.find((item) => item.skuName === skuName);

    if (!skuIsExist) {
      var newSku = { id, skuName, metrics: [], deleted: true };
      newSkus.push(newSku);
    }
  }

  return { newSkus };
};

export default extractNewSkusFromLIstGoods;
