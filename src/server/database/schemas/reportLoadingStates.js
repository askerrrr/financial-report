var { Schema } = require("mongoose");

var report_loading_states_schema = new Schema({
  userId: { type: String, required: true },
  requiredReportPeriods: { type: Array, required: false },
  reportsQueue: { type: Array, required: false },
  loadingInProgress: { type: Boolean, default: false },
  abandonedReports: { type: Array, required: false },
  lastReportRequestTimestamp: { type: Number, required: false },
  freshReportPeriodIndex: { type: Number, required: false },
});

module.exports = report_loading_states_schema;
