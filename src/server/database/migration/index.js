var upgradeReportsSchema = require("./upgradeReportsSchema");

var runDBMigration = async () => {
  await upgradeReportsSchema();

  return true;
};

module.exports = runDBMigration;
