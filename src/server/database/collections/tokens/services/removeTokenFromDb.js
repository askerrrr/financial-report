var removeTokenFromDb = async (collection, userId) => await collection.updateOne({ userId }, { $set: { token: "", tokenHasBeenRemoved: true } });

export default removeTokenFromDb;
