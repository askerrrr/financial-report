var createUser = async (collection, { login, passwd, userId }) => {
  try {
    var user = await collection.insertOne({ login, passwd, userId });

    var result = await user.save();

    return result == user;
  } catch (e) {}
};

module.exports = createUser;
