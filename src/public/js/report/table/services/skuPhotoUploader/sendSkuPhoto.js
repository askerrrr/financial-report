var sendSkuPhoto = async (objectKey, skuName, imgData) => {
  var res = await fetch(`/reports/sku-photo-upload/${objectKey}/${skuName}`, {
    method: "PUT",
    body: imgData,
  });

  return res.ok;
};

export default sendSkuPhoto;
