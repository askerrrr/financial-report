import createDeleteImgButton from "./skuPhotoUploader/createDeleteImgButton.js";

var injectSignedUrlsIntoImgTags = (userId, signedUrls) => {
  for (var { skuName, signedUrl } of signedUrls) {
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

    var photoCellContainer = document.getElementById(
      "photo-cell-container-" + skuName,
    );

    var deleteImageButton = createDeleteImgButton(userId, skuName);

    deleteImageButton.style.display = "block";
    photoCellContainer.append(deleteImageButton);
  }
};

export default injectSignedUrlsIntoImgTags;
