import { Schema } from "mongoose";

var lastLoadedReportSchema = new Schema(
  {
    periodIndex: { type: Number },
    reportId: { type: Number, required: true },
    totalTaxAmount: { type: Number, default: 0, required: true },
    totalFinalProfit: { type: Number, default: 0, required: true },
    totalProductCosts: { type: Number, default: 0, required: true },
    isFinancesAccounted: { type: Boolean, default: false, required: true },
  },
  { _id: false },
);

var reportLoadingStatesSchema = new Schema({
  userId: { type: String, required: true },
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
