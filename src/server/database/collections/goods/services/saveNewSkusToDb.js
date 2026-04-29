var saveNewSkusToDb = async (collection, userId, newSkus, session) => {
  var sessionOpt = session ? { session } : {};
  var result = await collection.updateOne({ userId }, { $push: { listGoods: { $each: [...newSkus] } } }, { ...sessionOpt });
  return result;
};

export default saveNewSkusToDb;
