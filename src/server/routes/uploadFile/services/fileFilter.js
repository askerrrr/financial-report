const { FileMimeTypeError } = require("../../../customError/customError");

module.exports = (req, file, cb) => {
  var validMimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  if (file.mimetype == validMimeType) {
    return cb(null, true);
  }

  throw new FileMimeTypeError();
};
