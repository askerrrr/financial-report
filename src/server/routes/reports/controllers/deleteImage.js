var { rm } = require("node:fs/promises");

var deleteImage = async (req, res, next) => {
  var { userId, skuName } = req.body;

  var filePath = `/var/report_items_photos/userId_${userId}/${skuName}.png`;

  var successDeleteImg;

  try {
    await rm(filePath);

    successDeleteImg = true;
  } catch {
    successDeleteImg = false;
  }

  return successDeleteImg ? res.sendStatus(200) : res.sendStatus(304);
};

module.exports = deleteImage;
