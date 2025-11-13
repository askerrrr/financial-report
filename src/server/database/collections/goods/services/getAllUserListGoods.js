var getAllUserListGoods = async (collection) => {
  var data = await collection.find({}, { _id: 0, id: 1 });

  return data;
};

module.exports = getAllUserListGoods;
