var s3 = require("../services/s3");
var moveFileToUserFolder = require("../services/different/moveFileToUserFolder");

var itemPhotoUpload = async (req, res, next) => {
  var { itemname } = req.params;

  var userId = req.app.locals.userId;
  var buffer = req.file.buffer
  
  var objectKey= itemname + "_" + userId;
  await s3.upload(objectKey, buffer);

 // await moveFileToUserFolder(userId, itemname, filePath);

  return res.sendStatus(200);
};

module.exports = itemPhotoUpload;
