var s3 = require("../services/s3");

var skuPhotoUpload = async (req, res, next) => {
  var { skuName } = req.params;

  var userId = req.app.locals.userId;
  var buffer = req.file.buffer
  
  var objectKey= 'skuname=' + skuName + ';' + 'userId='+ userId;
  var { httpStatusCode } = await s3.uploadFile(objectKey, buffer);
  return res.sendStatus(httpStatusCode);
};

module.exports = skuPhotoUpload;
