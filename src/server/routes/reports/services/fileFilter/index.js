module.exports = (req, file, cb) => {
  var validMimeType = ["image/jpg", "image/jpeg", "image/png"];

  return validMimeType.includes(file.mimetype) ? cb(null, (req.fileMimeTypeIsValid = true)) : cb(null, (req.fileMimeTypeIsValid = false));
};
