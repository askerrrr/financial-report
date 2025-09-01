const { DatabaseError } = require("../../../../customError");

var getAllReports = async (collection) => {
  try {
    var data = await collection.find();

    return data.map(item => item.toObject());
  } catch (e) {
    throw new DatabaseError("", e);
  }
};

module.exports = getAllReports;
