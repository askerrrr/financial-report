import Joi from "joi";
import dbUtils from '../../../database/collections/index.js'
import { getReportAsXLSXBuffer } from "../services/reportAsXLSXBuffer/index.js";

var schema = Joi.object({ userId: Joi.string().required(), reportId: Joi.number().required() });

var downloadReportAsXLSX = async (req, res, next) => {
  var { error } = schema.validate(req.params);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId, reportId } = req.params;
  var { getReportById } = dbUtils.reportCollectionServices;

  var { report } = await getReportById(userId, reportId);

  var buffer = await getReportAsXLSXBuffer(report);

  res.set({
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="download.xlsx"',
  });

  return res.send(buffer);
};

export default downloadReportAsXLSX;
