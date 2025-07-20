var { DatabaseError } = require("../../../customError");

var getUserOptionsFromDb = async (collection, userId) => {
  try {
    var options = await collection.findOne({ userId });

    return options;
  } catch (e) {
    throw new DatabaseError();
  }
};

module.exports = getUserOptionsFromDb;
