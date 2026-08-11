var setUploadId = async (collection, userId, uploadId, session) => {
  var sessionOpt = session ? { session: session } : {};
  var result = await collection.updateOne({ userId }, { $set: { uploadId } }, { ...sessionOpt });
};

export default setUploadId;
