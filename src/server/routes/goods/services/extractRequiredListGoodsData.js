var extractRequiredListGoodsData = async (rawListGoods) => {
  var listGoods = rawListGoods.map(({ item }) => {
    return {
      id: item.nmID,
      skuName: item.vendorCode,
      price: item.sizes.price,
      discount: item.discount,
      clubDiscount: item.sizes.clubDiscount,
      discountedPrice: item.sizes.discountedPrice,
    };
  });

  return { listGoods };
};

module.exports = extractRequiredListGoodsData;
