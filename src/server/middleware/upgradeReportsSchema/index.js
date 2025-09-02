var { SKUSchema } = require("../../database/schemas/reports");

var upgradeReportsSchema = async (reportCollectionServices) => {
  var newFields = [
    { key: "newKey1", value: "value1" },
    { key: "newKey2", value: "value2" },
  ];

  var { getAllDataFromReportCollection } = reportCollectionServices;

  var data = await getAllDataFromReportCollection();

  for (var { reports } of data) {
    reports.map((item) => {
      newFields.map((field) => {
        if (!item.hasOwnProperty(field.key)) {
          item[field.key] = field.value;
        }
      });
    });
  }
};

module.exports = upgradeReportsSchema;
