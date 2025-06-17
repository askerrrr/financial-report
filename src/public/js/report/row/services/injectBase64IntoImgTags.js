var injectBase64IntoImgTags = async (imageCollection) => {
  for (var { skuName, base64 } of imageCollection) {
    var imgTagId = "img-" + skuName;

    var src = `data:image/png=;base64,${base64}`;

    var img = document.getElementById(imgTagId);
    img.style.display = "block";
    img.src = src;

    var spanTagId = "span-" + skuName;
    var span = document.getElementById(spanTagId);
    span.style.display = "none";
  }
};

export default injectBase64IntoImgTags;
