var getReportLoadingState = async (collection, userId, session, selectedFields = [""]) => {
  var sessionOptions = session ? { session: session } : {};
  var doc = await collection.findOne({ userId }, { _id: 0 }, { ...sessionOptions }).select(selectedFields);
  return doc.toObject();
};

export default getReportLoadingState;
