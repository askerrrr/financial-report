var createUser = async (collection, { login, passwd }) => {
  try {
    var user = await collection.insertOne({ login, passwd });

    var result = await user.save();

    return result == user;
  } catch (e) {}
};

module.exports = createUser;
