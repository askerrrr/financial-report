import { DatabaseError } from "../../../../customError/index.js";

var getTaxParamsFromDb = async (collection, userId, year, session) => {
  try {
    var sessionOpt = session ? { session: session } : {};
    var data = await collection.findOne({ userId }, null, { ...sessionOpt });

    if (year) {
      return data.toObject().years.find((date) => date.year == year);
    }

    return data.toObject().years;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default getTaxParamsFromDb;
