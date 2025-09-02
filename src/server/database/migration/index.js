var upgradeReportsSchema = require("./upgradeReportsSchema");

var runDBMigration = async () => {
  await upgradeReportsSchema();
};

module.exports = runDBMigration;
