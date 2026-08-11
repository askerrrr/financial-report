var deleteListGoods = async (collection, userId, session) =>
  await collection.updateOne({ userId }, { $set: { listGoods: [] } }, { session: session });

export default deleteListGoods;
