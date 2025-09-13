var mongoose = require("mongoose");
var mongooseConnection = require("./mongooseConnection");
var setupMongooseEvents = require("./setupMongooseEvents");

var runDB = async () => {
  setupMongooseEvents(mongoose);
  await mongooseConnection(mongoose);

  var runDBMigration = require("./migration/");

  await runDBMigration().then(() => console.log("\n     migration completed\n-------------------------\n"));
};

module.exports = { runDB, connection: mongoose.connection };
