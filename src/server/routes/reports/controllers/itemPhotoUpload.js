var moveFileToReportFolder = require("../services/differentServices/moveFileToReportFolder");

var itemPhotoUpload = async (req, res, next) => {
  var { reportId, itemname } = req.params;

  var filePath = req.file.path;
  var fileName = req.file.originalname;

  await moveFileToReportFolder(reportId, itemname, fileName, filePath);

  return res.sendStatus(200);
};

module.exports = itemPhotoUpload;
