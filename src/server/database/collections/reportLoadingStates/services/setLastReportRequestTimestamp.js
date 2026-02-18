var setLastReportRequestTimestamp = async (collection, userId, session) => await collection.updateOne({ userId }, { $set: { lastReportRequestTimestamp: new Date().getTime() } }, { session: session });

module.exports = setLastReportRequestTimestamp;
