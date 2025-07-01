var { Schema } = require("mongoose");

var reportSchema = new Schema(
  {
    fullPeriod: { type: String, required: true },
    reportId: { type: String, required: true },
  },
  { _id: false }
);

var monthPeriodSchema = new Schema(
  {
    month: { type: String, required: false },
    reportIds: [{ type: reportSchema, required: false }],
  },

  { _id: false }
);

var yearsPeriodSchema = new Schema(
  {
    year: { type: String, required: false },
    months: [{ type: monthPeriodSchema }],
  },
  { _id: false }
);

var reportingPeriodsSchema = new Schema({
  userId: { type: String, required: true },
  years: [{ type: yearsPeriodSchema, required: false }],
});

module.exports = reportingPeriodsSchema;
