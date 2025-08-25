var { Schema } = require("mongoose");

var fullPeriodSchema = new Schema(
  {
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
  },
  { _id: false }
);

var reportSchema = new Schema(
  {
    reportId: { type: String, required: true },
    fullPeriod: { type: fullPeriodSchema, required: true },
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

var reportsTreeSchema = new Schema({
  userId: { type: String, required: true },
  years: [{ type: yearsPeriodSchema, required: false }],
});

module.exports = reportsTreeSchema;
