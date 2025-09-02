var { reportSchema } = require("../../database/schemas/reports");

var upgradeReportsSchema = async (reportCollectionServices) => {
  var reportSchemaKeys = Object.keys(reportSchema.obj);

  var { getAllDataFromReportCollection } = reportCollectionServices;

  var data = await getAllDataFromReportCollection();

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
