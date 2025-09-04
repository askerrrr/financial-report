var { reportSchema } = require("../schemas/reports");
var { reportSchemaVersion } = require("./schemaVersioning/reportsCollection");
var { getAllDataFromReportCollection, saveUpdatedReport } = require("../collections/reports");

var upgradeReportsSchema = async () => {
  var data = await getAllDataFromReportCollection();

  if (data.length === 0) {
    return;
  }

  var reportSchemaKeys = Object.keys(reportSchema.obj);

  for (var { reports } of data) {
    reports.map(async (report) => {
      if (report.schemaVersion !== reportSchemaVersion || !report.schemaVersion) {
        report.schemaVersion = reportSchemaVersion;

        reportSchemaKeys.map((key) => {
          if (!report.hasOwnProperty(key)) {
            report[key] = reportSchema[key]?.default ?? 0;

            console.log({ key: reportSchema[key]?.default });
            console.log("newKey: ", report[key]);
          }
        });

        console.log(`the report ${report.reportId} needs to be updated`);

        await saveUpdatedReport(report.userId, report.reportId, report);
      }
    });
  }
};

module.exports = upgradeReportsSchema;
