var { Schema } = require("mongoose");

var requiredReportPeriodsSchema = new Schema({
  userId: { type: String, required: true },
  requiredReportPeriods: { type: Array, required: false },
  failedReports: { type: Array, required: false },
  loadedReports: { type: Array, required: false },
});

module.exports = requiredReportPeriodsSchema;
