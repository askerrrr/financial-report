module.exports = (req, file, cb) =>
  file.mimetype ==
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ? cb(null, true)
    : cb(null, false);
