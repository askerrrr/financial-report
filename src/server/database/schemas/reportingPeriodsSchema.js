var { Schema } = require("mongoose");

var monthPeriodSchema = new Schema(
  {
    month: { type: String, required: false },
    reports: [{ type: String, required: false }],
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
