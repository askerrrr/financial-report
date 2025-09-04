var { reportSchema } = require("../schemas/reports");
var { reportSchemaVersion } = require("./schemaVersioning/reportsCollection");
var { getAllDataFromReportCollection, saveUpdatedReport } = require("../collections/reports");

var upgradeReportsSchema = async () => {
  var data = await getAllDataFromReportCollection();

  if (data.length === 0) {
    return;
  }

  var reportSchemaKeys = Object.keys(reportSchema.obj);
  var updatedReportsCount = 0,
    updateFailedReportsCount = 0,
    pendingReportUpdatesCount = 0;

  try {
    for (var { reports } of data) {
      for (var report of reports) {
        if (report.schemaVersion !== reportSchemaVersion || !report.schemaVersion) {
          pendingReportUpdatesCount++;

          var updatedReport = { ...report };

          updatedReport.schemaVersion = reportSchemaVersion;

          reportSchemaKeys.map((key) => {
            if (!updatedReport.hasOwnProperty(key)) {
              updatedReport[key] = reportSchema[key]?.default ?? 0;
            }
          });

          try {
            var success = await saveUpdatedReport(report.userId, report.reportId, updatedReport);

            if (!success) {
              updateFailedReportsCount++;
            } else {
              updatedReportsCount++;
            }
          } catch (e) {
            console.log({ errMsg: e.message, errName: "DBMigrationError", stack: e.stack });
            updateFailedReportsCount++;
          }
        }
      }
    }
  } catch (e) {
    console.log({ errMsg: e.message, errName: "DBMigrationError", stack: e.stack });
  }

  if (pendingReportUpdatesCount) {
    return {
      msg: `result of migration of the "reports" collection\npendingReportUpdatesCount: ${pendingReportUpdatesCount}\nupdatedReportsCount: ${updatedReportsCount}\nupdateFailedReportsCount: ${updateFailedReportsCount}`,
    };
  }
};

module.exports = upgradeReportsSchema;
