var sendItemPhoto = async (itemName, imgData) => {
  var res = await fetch(`/reports/item-photo-upload/${itemName}`, {
    method: "POST",
    body: imgData,
  });

  return res.ok;
};

export default sendItemPhoto;
