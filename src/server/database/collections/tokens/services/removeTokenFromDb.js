var removeTokenFromDb = async (collection, userId) =>
  (await collection.updateOne({ userId }, { $set: { token: "", tokenHasBeenRemoved: true } })).modifiedCount;

export default removeTokenFromDb;
