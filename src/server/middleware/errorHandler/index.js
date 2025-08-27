var multer = require("multer");
var { WBAPIError, FormDataError, DatabaseError, ReportNotFoundError, DatabaseConnectionError } = require("../../customError");

var errorHandler = async (e, req, res, next) => {
  console.log({ msg: e.message, errName: e.name, status: e?.status || 500, stack: e.stack, cause: e?.cause || null });

  if (e instanceof multer.MulterError) {
    return res.sendStatus(500);
  }

  if (e instanceof DatabaseError && DatabaseConnectionError) {
    return res.sendStatus(e.status);
  }

  if (e instanceof WBAPIError) {
    return res.status(e.status).json({ msg: e.message });
  }

  if (e instanceof ReportNotFoundError) {
    return res.status(e.status).json({ msg: e.message });
  }

  if (e instanceof FormDataError) {
    return res.status(e.status).json({ msg: e.message, invalidField: e.invalidField });
  }

  res.status(e?.status || 500).json({ msg: e.message, status: e?.status || 500 });
};

module.exports = errorHandler;
