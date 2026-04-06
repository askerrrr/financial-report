import { DatabaseError } from "../../../../customError/index.js";

var saveUpdatedTaxParams = async (collection, userId, year, taxParams) => {
  try {
    var result = await collection(
      { userId, "years.year": year },
      {
        $set: { "years.$": taxParams },
      },
    );

    return result.acknowledged;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default saveUpdatedTaxParams;
