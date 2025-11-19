var getAllUsersFromDb = async (collection) => {
  var users = await collection.find({}, { _id: 0, userId: 1 });

  return { users };
};

module.exports = getAllUsersFromDb;
