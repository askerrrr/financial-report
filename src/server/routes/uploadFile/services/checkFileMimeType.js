var checkFileMimeType = async (file) =>
  file.mimetype ==
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

module.exports = checkFileMimeType;
