var getAllUserListGoodsIds = async (collection) => {
  var data = await collection.find({}, { _id: 0, userId: 1, "listGoods.id": 1 });

  return data;
};

module.exports = getAllUserListGoodsIds;
