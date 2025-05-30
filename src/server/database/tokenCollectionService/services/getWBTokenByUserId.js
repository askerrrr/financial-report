var getWBTokenByUserId = async (collection, userId) => {
  var user = await collection.findOne({ userId });

  return user.token;
};

module.exports = getWBTokenByUserId;
