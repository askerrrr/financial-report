var injectSignedUrlsIntoImgTags = (imageCollection) => {
  for (var { skuName, signedUrl } of imageCollection) {
    var imageTagId = "img-" + skuName;

    var image = document.getElementById(imageTagId);

    image.width = 90;
    image.height = 75;
    image.src = signedUrl;
    image.style.display = "block";

    var spanTagId = "span-" + skuName;
    var span = document.getElementById(spanTagId);
    span.style.display = "none";

    var deleteImageButton = document.getElementById(
      "delete-image-button-" + skuName,
    );

    if (deleteImageButton) {
      deleteImageButton.style.display = "block";
    }
  }
};

export default injectSignedUrlsIntoImgTags;
