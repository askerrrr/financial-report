var getGoodsData = async (userId) => {
  var url = "/goods/api/" + userId;

  var res = await fetch(url);

  if (!res.ok) {
    alert("some error message");
    return;
  }

  var { listGoods, weeklyPricesAndDiscounts } = await res.json();

  return { listGoods, weeklyPricesAndDiscounts };
};

export default getGoodsData;
