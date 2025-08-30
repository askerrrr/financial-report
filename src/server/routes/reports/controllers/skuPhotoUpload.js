var s3 = require("../services/s3");

var skuPhotoUpload = async (req, res, next) => {
  var { objectKey } = req.params;
  var buffer = req.file.buffer;
  var { httpStatusCode } = await s3.uploadFile(objectKey, buffer);
  return res.sendStatus(httpStatusCode);
};

module.exports = skuPhotoUpload;
