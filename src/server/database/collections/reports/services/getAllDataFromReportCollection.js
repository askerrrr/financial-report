const { DatabaseError } = require("../../../../customError");

var getAllDataFromReportCollection = async (collection) => {
  try {
    var data = await collection.find();

    return data.map((item) => item.toObject());
  } catch (e) {
    throw new DatabaseError("", e);
  }
};

module.exports = getAllDataFromReportCollection;
