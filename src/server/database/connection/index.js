var mongoose = require("mongoose");
var { userSchema, reportSchema } = require("../schemas/index");

var reportDB = mongoose.createConnection("mongodb://127.0.0.1:27017/reports");

var userCollection = reportDB.model("User", userSchema);

var reportCollection = reportDB.model("Report", reportSchema);

module.exports = { userCollection, reportCollection };
