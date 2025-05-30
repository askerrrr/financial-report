var updateWBToken = async (collection, userId, token) => {
  var result = await collection.updateOne(
    { userId },
    {
      $set: { token },
    }
  );

  return result.modifiedCount;
};

module.exports = updateWBToken;
