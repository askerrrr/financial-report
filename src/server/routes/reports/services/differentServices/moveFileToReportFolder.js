var { rename } = require("node:fs/promises");

var moveFileToReportFolder = async (reportId, itemName, oldPath) => {
  var newPath = `/var/report_items_photos/reportId_${reportId}/${itemName}.png`;
  console.log(newPath);
  await rename(oldPath, newPath);
};

module.exports = moveFileToReportFolder;
