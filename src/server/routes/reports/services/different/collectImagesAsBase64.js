var s3 = require("../s3");

var collectImagesAsBase64 = async (userId, skus) => {
  var skuImages = [];

  for (var { skuName } of skus) {
    var objectKey = "skuname=" + skuName + ";" + "userId=" + userId;

    var base64 = await s3.getFile(objectKey);
    skuImages.push({ skuName, base64 });
  }

  return { skuImages };
};

module.exports = collectImagesAsBase64;
