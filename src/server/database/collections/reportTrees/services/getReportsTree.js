var { DatabaseError } = require("../../../../customError");

var getReportsTree = async (collection, userId) => {
  try {
    var { years } = await collection.findOne({ userId }).exec();

    return { reportTree: years };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsTree;
