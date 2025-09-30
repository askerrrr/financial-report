var { Schema } = require("mongoose");

var pendingReportsSchema = new Schema({
  userId: { type: String, required: true },
  requiredReportPeriods: { type: Array, required: false },
  loadedReports: { type: Array, required: false },
  remainingReports: { type: Array, required: false },
  failedReports: { type: Array, required: false },
});

module.exports = pendingReportsSchema;
