var validMimeTypes = [
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

var validUrls = ["/report/files", "/decode-report-without-registration/files"];

var fileFilter = (req, file, cb) => {
  return validUrls.includes(req.originalUrl) &&
    validMimeTypes?.includes(file.mimetype)
    ? cb(null, true)
    : cb(null, false);
};

export default fileFilter;
