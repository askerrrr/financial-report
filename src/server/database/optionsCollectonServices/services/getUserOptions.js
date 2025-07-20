var { DatabaseError } = require("../../../customError");

var getUserOptions = async (collection, userId) => {
  try {
    var options = await collection.findOne({ userId });

    return options;
  } catch (e) {
    throw new DatabaseError();
  }
};

module.exports = getUserOptions;
