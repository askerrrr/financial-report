var sendSkuPhoto = async (objectKey, imgData) => {
  var res = await fetch(`/reports/sku-photo-upload/${objectKey}`, {
    method: "PUT",
    body: imgData,
  });

  return res.ok;
};

export default sendSkuPhoto;
