var { reportSchema } = require("../schemas/reports");
var { getAllDataFromReportCollection } = require("../collections/reports");
var { reportSchemaVersion } = require("./schemaVersioning/reportsCollection");

var upgradeReportsSchema = async () => {
  var data = await getAllDataFromReportCollection();

  if (data.length === 0) {
    return;
  }

  var reportSchemaKeys = Object.keys(reportSchema.obj);

  for (var { reports } of data) {
    reports.map((report) => {
      console.log("schemaVersion in different", report.schemaVersion !== reportSchemaVersion);

      if (report.schemaVersion !== reportSchemaVersion) {
        reportSchemaKeys.map((key) => {
          if (!report.hasOwnProperty(key)) {
            report[key] = reportSchema[key]?.default ?? 0;

            console.log({ key: reportSchema[key]?.default });
            console.log("newKey: ", report[key]);
          }
        });
      }
    });
  }
};

module.exports = upgradeReportsSchema;
