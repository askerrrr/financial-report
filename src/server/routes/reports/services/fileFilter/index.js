module.exports = (req, file, cb) => {
  var validMimeType;

  if (req.path == "/upload/file" || req.path == "/upload/files") {
    validMimeType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    return file.mimetype == validMimeType
      ? cb(null, (req.fileMimeTypeIsValid = true))
      : cb(null, (req.fileMimeTypeIsValid = false));
  }

  if (req.path.startsWith("/item-photo-upload/")) {
    validMimeType = ["image/jpg", "image/jpeg", "image/png"];

    return validMimeType.includes(file.mimetype)
      ? cb(null, (req.fileMimeTypeIsValid = true))
      : cb(null, (req.fileMimeTypeIsValid = false));
  }
};
