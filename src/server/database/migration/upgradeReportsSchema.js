var { reportSchema } = require("../schemas/reports");
var { getAllDataFromReportCollection } = require("../collections/reports");

var upgradeReportsSchema = async () => {
  var reportSchemaKeys = Object.keys(reportSchema.obj);

  var data = await getAllDataFromReportCollection();
  console.log({ reportSchemaKeys });
  if (data.length === 0) {
    return;
  }

  for (var { reports } of data) {
    reports.map((report) => {
      reportSchemaKeys.map((key) => {
        if (!report.hasOwnProperty(key)) {
          console.log({ key });
          report[key] = reportSchema[key];
        }
      });
    });
  }
};

module.exports = upgradeReportsSchema;
