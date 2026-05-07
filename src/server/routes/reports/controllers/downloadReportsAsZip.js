import Joi from "joi";
import JSZip from "jszip";
import dbUtils from '../../../database/collections/index.js'
import { getReportAsXLSXBuffer, getMonthlySummaryAsXLSXBuffer } from "../services/reportAsXLSXBuffer/index.js";

var schema = Joi.object({ userId: Joi.string().required(), reportIds: Joi.array().items(Joi.number()).required() });

var downloadReportsAsZip = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId, reportIds } = req.body;
  var { getReportById } = dbUtils.reportCollectionServices;

  var reports = [];

  for (var reportId of reportIds) {
    var { report } = await getReportById(userId, reportId);

    reports.push(report);
  }

  var zip = new JSZip();

  var folder = zip.folder("Отчеты");

  for (var report of reports) {
    var buffer = await getReportAsXLSXBuffer(report);

    var fileName = `Детали отчета от ${report.dateFrom} по ${report.dateTo}.xlsx`;

    folder.file(fileName, buffer);
  }

  var monthlySummaryBuffer = await getMonthlySummaryAsXLSXBuffer(reports);

  folder.file("Сводка.xlsx", monthlySummaryBuffer);

  var zipBuffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });

  res.set({
    "Content-Type": "application/zip",
    "Content-Length": zipBuffer.length,
    "Content-Disposition": 'attachment; filename="reports.zip"',
  });

  return res.send(zipBuffer);
};

export default downloadReportsAsZip;
