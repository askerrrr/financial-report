var sendSkuPhoto = async (skuName, imgData) => {
  var res = await fetch(`/reports/sku-photo-upload/${skuName}`, {
    method: "POST",
    body: imgData,
  });

  return res.ok;
};

export default sendSkuPhoto;
