var { join } = require("node:path");
var getImageToBase64 = require("./getImageToBase64");

var collectImagesAsBase64 = async (userId, items) => {
  var array = [];

  for (var item of items) {
    var { itemName } = item;

    var fileName = itemName + ".png";

    var userDir = "userId_" + userId;

    var filePath = join("/var", "report_items_photos", userDir, fileName);

    var base64 = await getImageToBase64(filePath);

    array.push({ itemName, base64 });
  }

  return array;
};

module.exports = collectImagesAsBase64;
