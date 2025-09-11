var upgradeSKUsShema = require("./upgradeSKUsShema");
var upgradeReportsSchema = require("./upgradeReportsSchema");

var runDBMigration = async () => {
  console.log("-------------------------\n     Database migration\nSchema list:");
  await upgradeSKUsShema();
  await upgradeReportsSchema();
};

module.exports = runDBMigration;
