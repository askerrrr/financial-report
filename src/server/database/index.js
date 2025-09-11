var mongoose = require("mongoose");
var mongooseConnection = require("./mongooseConnection");
var setupMongooseEvents = require("./setupMongooseEvents");

var connection = mongoose.connection;

var runDB = async () => {
  setupMongooseEvents(connection);
  await mongooseConnection(mongoose);

  var runDBMigration = require("./migration/");

  await runDBMigration().then(() => console.log("\n     migration completed\n-------------------------\n"));
};

module.exports = { runDB, connection };
