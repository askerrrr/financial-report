import { Schema } from "mongoose";

var lastLoadedReportSchema = new Schema(
  {
    periodIndex: { type: Number },
    year: { type: Number, required: true },
    month: { type: String, required: true },
    dateTo: { type: String, required: true },
    dateFrom: { type: String, required: true },
    reportId: { type: Number, required: true },
    totalTaxAmount: { type: Number, default: 0, required: true },
  },
  { _id: false },
);

var reportLoadingStatesSchema = new Schema({
  userId: { type: String, required: true },
  queueLength: { type: Number, default: 0 },
  reportsQueue: { type: Array, required: false },
  loadingInProgress: { type: Boolean, default: false },
  abandonedReports: { type: Array, required: false },
  lastReportRequestTimestamp: { type: Number, default: 0 },
  freshReportPeriodIndex: { type: Number, required: false },
  lastLoadedReport: { type: lastLoadedReportSchema, required: false },
  isReportLoadingDelayed: { type: Boolean, requred: true, default: false },
  isReportLoadingisStopped: { type: Boolean, requred: true, default: false },
});

export default reportLoadingStatesSchema;
