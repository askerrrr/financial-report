var { Schema } = require("mongoose");

var report_loading_states_schema = new Schema({
  userId: { type: String, required: true },
  requiredReportPeriods: { type: Array, required: false },
  loadedReports: { type: Array, required: false },
  remainingReports: { type: Array, required: false },
  failedReportsQueue: { type: Array, required: false },
  reportsQueue: { type: Array, required: false },
  loadingInProgress: { type: Boolean, default: false },
  abandonedReports: { type: Array, required: false },
  freshReportPeriodIndex: { type: Number, required: false },
});

module.exports = report_loading_states_schema;
