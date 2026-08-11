var getUploadId = async (collection, userId) => {
  var { uploadId } = await collection.findOne({ userId });

  return { uploadId };
};

export default getUploadId;
