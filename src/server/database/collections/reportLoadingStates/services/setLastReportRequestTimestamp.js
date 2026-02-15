var setLastReportRequestTimestamp = async (collection, userId) => await collection.updateOne({ userId }, { $set: { lastReportRequestTimestamp: new Date().getTime() } });

module.exports = setLastReportRequestTimestamp;
