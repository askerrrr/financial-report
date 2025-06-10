var { mkdir } = require("node:fs/promises");

var createReportItemPhotosFolder = async (reportId) =>
  await mkdir("/var/report_items_photos/" + "reportId_" + reportId, {
    recursive: true,
  });

module.exports = createReportItemPhotosFolder;
