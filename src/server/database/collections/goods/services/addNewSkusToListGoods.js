var addNewSkusToListGoods = async (collection, userId, newSkus) => {
  var result = await collection.updateOne({ userId }, { $push: { listGoods: { $each: [...newSkus] } } });
  return result;
};

module.exports = addNewSkusToListGoods;
