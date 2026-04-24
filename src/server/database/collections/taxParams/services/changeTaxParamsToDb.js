var changeTaxParamsToDb = async (collection, userId, year, session, newTaxParams) => {
  var query = {};

  for (var key of Object.keys(newTaxParams)) {
    query[`years.$.${key}`] = newTaxParams[key];
  }

  var result = await collection.updateOne({ userId, "years.year": year }, { $set: query }, { session: session });

  return result.acknowledged;
};

export default changeTaxParamsToDb;
