var { rename } = require("node:fs/promises");

var moveFileToUserFolder = async (userId, skuName, oldPath) => {
  var newPath = `/var/report_skus_photo/userId_${userId}/${skuName}.png`;

  await rename(oldPath, newPath);
};

module.exports = moveFileToUserFolder;
