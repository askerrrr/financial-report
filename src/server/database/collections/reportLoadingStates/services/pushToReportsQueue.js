var pushToReportsQueue = async (collection, userId, periods, session, needToResetAbandonedReports = false) => {
  var sessionOpt = session ? { session } : {};

  if (needToResetAbandonedReports) {
    await collection.updateOne(
      { userId },
      { $push: { reportsQueue: { $each: [...periods] }, $set: { abandonedReports: [] } } },
      { session: session },
    );
  } else {
    await collection.updateOne({ userId }, { $push: { reportsQueue: { $each: [...periods] } } }, { session: session });
  }
};

export default pushToReportsQueue;
