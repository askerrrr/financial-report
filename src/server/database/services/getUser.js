var getUser = async (collection, login) => {
  try {
    return await collection.findOne({ login }).exec();
  } catch (e) {}
};

module.exports = getUser;
