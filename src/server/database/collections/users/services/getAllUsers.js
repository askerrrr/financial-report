var getAllUsersFromDb = async (collection) => {
  var users = await collection.find({}, { _id: 0, passwd: 0 });
  return { users };
};

export default getAllUsersFromDb;
