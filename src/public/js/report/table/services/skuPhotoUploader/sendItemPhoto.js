var sendItemPhoto = async (itemName, imgData) => {
  var res = await fetch(`/reports/item-photo-upload/${itemName}`, {
    method: "POST",
    body: imgData,
  });

  if (!res.ok) {
    return alert("Не удалось загрузить изображение");
  }

  alert("Изображение сохранено");
};

export default sendItemPhoto;
