var upgradeSKUsShema = require("./upgradeSKUsShema");
var upgradeReportsSchema = require("./upgradeReportsSchema");

var runDBMigration = async () => {
  console.log("Database migration\nCollections:");
  try {
    //await upgradeSKUsShema();
    await upgradeReportsSchema();

    return true;
  } catch (e) {
    console.log(e.message);
    return;
  }
};

module.exports = runDBMigration;
