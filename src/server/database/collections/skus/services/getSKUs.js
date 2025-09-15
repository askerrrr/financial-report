const { DatabaseError } = require("../../../../customError");

var getSKUs = async (collection, userId) => {
  try {
    var { skus } = await collection.findOne({ userId });

    return skus;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getSKUs;
