export default (req, file, cb) => {
  var validMimeType;

  if (req.originalUrl === "/report/image") {
    validMimeType = ["image/jpg", "image/jpeg", "image/png"];
  } else if (req.originalUrl === "/report/weekly-financial-report-file") {
    validMimeType = ["application/zip"];
  }

  return validMimeType?.includes(file.mimetype) ? cb(null, (req.fileMimeTypeIsValid = true)) : cb(null, (req.fileMimeTypeIsValid = false));
};
