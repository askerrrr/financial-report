var { DatabaseError } = require("../../../customError");

var getTaxParamsFromDb = async (collection, userId) => {
  try {
    var options = await collection.findOne({ userId });

    return options.toObject();
  } catch (e) {
    throw new DatabaseError();
  }
};

module.exports = getTaxParamsFromDb;
