var prependToReportsQueue = async (collection, userId, dateFrom, dateTo) => {
  var result = await collection.updateOne({ userId }, { $push: { reportsQueue: { $each: [{ dateFrom, dateTo }], $position: 0 } } });
  return result;
};

module.exports = prependToReportsQueue;
