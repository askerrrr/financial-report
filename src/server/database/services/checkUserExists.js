var checkUserExists = async (collection, login) => {
  try {
    return await collection.find({ login }).exec();
  } catch (e) {}
};

module.exports = checkUserExists;
