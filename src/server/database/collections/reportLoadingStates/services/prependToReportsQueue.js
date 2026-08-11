var prependToReportsQueue = async (collection, userId, dateFrom, dateTo) => {
  var result = await collection.updateOne(
    { userId },
    { $push: { reportsQueue: { $each: [{ dateFrom, dateTo }], $position: 0 } }, $inc: { queueLength: 1, queueCapacity: 1 } },
  );
  return result;
};

export default prependToReportsQueue;
