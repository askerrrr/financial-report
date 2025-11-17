var getUploadId = async (collection, userId) => {
  var { uploadId } = await collection.findOne({ userId });

  return { uploadId };
};

module.exports = getUploadId;
