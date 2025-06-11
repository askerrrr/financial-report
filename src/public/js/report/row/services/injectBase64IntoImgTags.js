var injectBase64IntoImgTags = async (imageCollection) => {
  for (var data of imageCollection) {
    var { itemName, base64 } = data;

    var imgTagId = "img-" + itemName;

    var src = `data:image/png=;base64,${base64}`;

    var img = document.getElementById(imgTagId);
    img.style.display = "block";
    img.src = src;

    var spanTagId = "span-" + itemName;
    var span = document.getElementById(spanTagId);
    span.style.display = "none";
  }
};

export default injectBase64IntoImgTags;
