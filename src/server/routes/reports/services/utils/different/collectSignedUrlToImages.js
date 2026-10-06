import s3 from "../s3/index.js";

var collectSignedUrlToImages = async (userId, skus) => {
  var skuImages = [];

  for (var { skuName } of skus) {
    var objectKey = userId + ";" + skuName;

    var { signedUrl } = await s3.getFile(objectKey);

    if (signedUrl) {
      skuImages.push({ skuName, signedUrl });
    }
  }

  return { skuImages };
};

export default collectSignedUrlToImages;
