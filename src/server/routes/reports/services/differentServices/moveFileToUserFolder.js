var { rename } = require("node:fs/promises");

var moveFileToUserFolder = async (userId, itemName, oldPath) => {
  var newPath = `/var/report_items_photos/userId_${userId}/${itemName}.png`;

  await rename(oldPath, newPath);
};

module.exports = moveFileToUserFolder;
