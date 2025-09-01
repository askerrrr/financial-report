const { DatabaseError } = require("../../../../customError");

var getAllReports = async (collection) => {
  try {
    var data = await collection.find();

    return data;
  } catch (e) {
    throw new DatabaseError("", e);
  }
};

module.exports = getAllReports;
