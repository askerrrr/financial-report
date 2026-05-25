var removeTokenFromDb = async (collection, userId) => await collection.updateOne({ userId }, { $set: { token: "" } });

export default removeTokenFromDb;
