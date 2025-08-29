var s3 = require("../services/s3");

var itemPhotoUpload = async (req, res, next) => {
  var { itemname } = req.params;

  var userId = req.app.locals.userId;
  var buffer = req.file.buffer
  
  var objectKey= itemname + "_" + userId;
  await s3.uploadFile(objectKey, buffer);
  return res.sendStatus(200);
};

module.exports = itemPhotoUpload;
