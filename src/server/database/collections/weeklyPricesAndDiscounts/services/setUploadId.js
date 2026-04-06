var setUploadId = async (collection, userId, uploadId) => {
  var result = await collection.updateOne({ userId }, { $set: { uploadId } });
};

export default setUploadId;
