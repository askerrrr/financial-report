var upgradeSKUsShema = require("./upgradeSKUsShema");
var upgradeReportsSchema = require("./upgradeReportsSchema");

var runDBMigration = async () => {
  await upgradeSKUsShema();
  // await upgradeReportsSchema();

  return true;
};

module.exports = runDBMigration;
