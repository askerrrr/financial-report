var { rename } = require("node:fs/promises");

var getFileExtension = async (fileName) => fileName.split(".").at(-1);

var moveFileToReportFolder = async (reportId, itemName, fileName, oldPath) => {
  var fileExtension = await getFileExtension(fileName);

  var newPath = `/var/report_items_photos/reportId_${reportId}/${itemName}.${fileExtension}`;

  await rename(oldPath, newPath);
};

module.exports = moveFileToReportFolder;
