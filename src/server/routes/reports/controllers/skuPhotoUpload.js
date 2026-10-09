import s3 from "../services/utils/s3/index.js";

var skuPhotoUploadController = async (req, res, next) => {
  var { userId, skuName, fileType } = req.body;

  var objectKey = userId + ";" + skuName;

  var { presignedUrl } = await s3.uploadFile(objectKey, fileType);

  return res.json({ presignedUrl });
};

export default skuPhotoUploadController;
