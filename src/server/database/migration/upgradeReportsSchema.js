var { reportSchema } = require("../schemas/reports");
var { DBMigrationError } = require("../../customError");
var { reportSchemaVersion } = require("./schemaVersioning/reportsCollection");
var { getAllDataFromReportCollection, saveUpdatedReport } = require("../collections/reports");

var upgradeReportsSchema = async () => {
  var data = await getAllDataFromReportCollection();

  if (data.length === 0) {
    return;
  }

  var userId;
  var failedUpdates = [];
  var updatedReportsCount = 0,
    pendingReportUpdatesCount = 0;
  var reportSchemaKeys = Object.keys(reportSchema.obj);

  try {
    for (var { reports } of data) {
      for (var report of reports) {
        if (report.schemaVersion !== reportSchemaVersion || !report.schemaVersion) {
          pendingReportUpdatesCount++;

          var updatedReport = { ...report };

          updatedReport.schemaVersion = reportSchemaVersion;

          reportSchemaKeys.forEach((key) => {
            if (!updatedReport.hasOwnProperty(key)) {
              updatedReport[key] = reportSchema[key]?.default ?? 0;
            }
          });

          try {
            var success = await saveUpdatedReport(report.userId, report.reportId, updatedReport);

            if (!success) {
              userId = report.userId;
              failedUpdates.push(report.reportId);
            }

            updatedReportsCount++;
          } catch (e) {
            userId = report.userId;
            failedUpdates.push(report.reportId);
            throw new DBMigrationError(userId, failedUpdates);
          }
        }
      }
    }

    if (pendingReportUpdatesCount) {
      console.log("reports --- success");
      return;
    }

    console.log("reports --- does not need");
  } catch (e) {
    throw new DBMigrationError(userId, failedUpdates);
  }
};

module.exports = upgradeReportsSchema;
