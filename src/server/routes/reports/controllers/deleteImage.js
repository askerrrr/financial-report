var s3 = require('../services/s3')

var deleteImage = async (req, res, next) => {
  var { userId, skuName } = req.body;
  var objectKey = 'skuname=' + skuName + ';' + 'userId=' + userId
  var success = await s3.deleteFile(objectKey)

  return success ? res.sendStatus(200) : res.sendStatus(304);
};

module.exports = deleteImage;
