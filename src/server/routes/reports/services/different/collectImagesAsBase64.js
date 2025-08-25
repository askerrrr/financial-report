var { join } = require("node:path");
var getImageToBase64 = require("./getImageToBase64");

var collectImagesAsBase64 = async (userId, skus) => {
  var array = [];

  for (var sku of skus) {
    var { skuName } = sku;

    var fileName = skuName + ".png";

    var userDir = "userId_" + userId;

    var filePath = join("/var", "report_skus_photo", userDir, fileName);

    var base64 = await getImageToBase64(filePath);

    array.push({ skuName, base64 });
  }

  return array;
};

module.exports = collectImagesAsBase64;
