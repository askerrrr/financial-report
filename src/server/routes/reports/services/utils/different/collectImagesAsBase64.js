import s3 from "../s3/index.js";

var collectImagesAsBase64 = async (userId, skus) => {
  var skuImages = [];

  for (var { skuName } of skus) {
    var objectKey = userId + ";" + skuName;

    var base64 = await s3.getFile(objectKey);
    skuImages.push({ skuName, base64 });
  }

  return { skuImages };
};

export default collectImagesAsBase64;
