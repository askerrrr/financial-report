var sendSkuPhoto = async (skuName, imgData) => {
  var res = await fetch(`/report/sku-photo-upload/${skuName}`, {
    method: "PUT",
    body: imgData,
  });

  return res.ok;
};

export default sendSkuPhoto;
