var { mkdir } = require("node:fs/promises");

var createUserReportPhotosFolder = async (userId) =>
  await mkdir(`/var/report_skus_photo/userId_${userId}`, { recursive: true });

module.exports = createUserReportPhotosFolder;
