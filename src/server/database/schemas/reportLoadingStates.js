import { Schema } from "mongoose";

var reportLoadingStatesSchema = new Schema({
  userId: { type: String, required: true },
  requiredReportPeriods: { type: Array, required: false },
  reportsQueue: { type: Array, required: false },
  loadingInProgress: { type: Boolean, default: false },
  abandonedReports: { type: Array, required: false },
  lastReportRequestTimestamp: { type: Number, default: 0 },
  freshReportPeriodIndex: { type: Number, required: false },
  isReportLoadingDelayed: { type: Boolean, requred: true, default: false },
});

export default reportLoadingStatesSchema;
