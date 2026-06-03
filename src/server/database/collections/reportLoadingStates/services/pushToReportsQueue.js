var pushToReportsQueue = async (collection, userId, periods, session) => {
  var sessionOpt = session ? { session } : {};
  await collection.updateOne({ userId }, { $push: { reportsQueue: { $each: [...periods] } } }, { session: session });
};

export default pushToReportsQueue;
