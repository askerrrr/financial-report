import { DatabaseError } from "../../../../customError/index.js";

var getAllDataFromReportCollection = async (collection) => {
  try {
    var data = await collection.find();

    return data.map((item) => item.toObject());
  } catch (e) {
    throw new DatabaseError("", e);
  }
};

export default getAllDataFromReportCollection;
