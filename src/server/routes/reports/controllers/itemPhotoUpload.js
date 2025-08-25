var moveFileToUserFolder = require("../services/different/moveFileToUserFolder");

var itemPhotoUpload = async (req, res, next) => {
  var { itemname } = req.params;

  var userId = req.app.locals.userId;

  var filePath = req.file.path;

  await moveFileToUserFolder(userId, itemname, filePath);

  return res.sendStatus(200);
};

module.exports = itemPhotoUpload;
