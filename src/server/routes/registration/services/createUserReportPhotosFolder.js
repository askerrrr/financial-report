var { mkdir } = require("node:fs/promises");

var createUserReportPhotosFolder = async (userId) =>
  await mkdir(`/var/report_items_photos/userId_${userId}`, { recursive: true });

module.exports = createUserReportPhotosFolder;
