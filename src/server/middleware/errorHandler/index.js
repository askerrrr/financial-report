var multer = require("multer");
var { WBAPIError, FormDataError, DatabaseError, ReportNotFoundError, DatabaseConnectionError } = require("../../customError");

var errorHandler = async (e, req, res, next) => {
  console.log("e: ", e);

  if (e instanceof multer.MulterError) {
    console.log("MulterError ", e);
    return res.sendStatus(500);
  }

  if (e instanceof DatabaseError && DatabaseConnectionError) {
    return res.sendStatus(500);
  }

  if (e instanceof WBAPIError) {
    return res.status(e.status).json({ msg: e.message });
  }

  if (e instanceof ReportNotFoundError) {
    return res.status(404).json({ msg: e.message });
  }

  if(e instanceof FormDataError) {
    return res.status(e.status).json({msg: e.message})
  }

  res.status(e.status).json({msg: e.message, status: e.status})
};

module.exports = errorHandler;
