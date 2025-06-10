module.exports = (req, file, cb) => {
  var validMimeType;

  if (req.path == "/upload/file" || req.path == "/upload/files") {
    validMimeType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    return file.mimetype == validMimeType
      ? cb(null, (req.fileMimeTypeIsValid = true))
      : cb(null, (req.fileMimeTypeIsValid = false));
  }
};
