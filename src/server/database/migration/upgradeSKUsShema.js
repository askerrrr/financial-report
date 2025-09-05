var { SKUSchema } = require("../schemas/reports");
var { skuSchemaVersion } = require("./schemaVersioning/reportsCollection");
var { getAllDataFromReportCollection, saveUpdatedReport } = require("../collections/reports");

var upgradeSKUsShema = async () => {
  var data = await getAllDataFromReportCollection();

  var skuSchemaKeys = Object.keys(SKUSchema.obj);

  try {
    for (var { reports } of data) {
      for (var report of reports) {
        var { skus } = report;

        for (var sku of skus) {
          if (sku.schemaVersion !== skuSchemaVersion) {
            sku.schemaVersion = skuSchemaVersion;

            skuSchemaKeys.map((key) => {
              if (sku.hasOwnProperty(key)) {
                sku[key] = skuSchemaKeys[key]?.default ?? 0;
              }
            });
          }
        }
      }
    }
  } catch (e) {}
};

module.exports = upgradeSKUsShema;
