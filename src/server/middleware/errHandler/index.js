var multer = require("multer");
var {
  DatabaseError,
  WBAPIError,
  ReportNotFoundError,
} = require("../../customError");

var errorHandler = async (e, req, res, next) => {
  console.log("e: ", e);

  if (e instanceof multer.MulterError) {
    console.log("MulterError ", e);
    return res.sendStatus(500);
  }

  if (e instanceof DatabaseError) {
    return res.sendStatus(500);
  }

  if (e instanceof WBAPIError) {
    res.status(e.status).json({ msg: e.message });
  }

  if (e instanceof ReportNotFoundError) {
    return res.status(404).json({ msg: e.message });
  }
};

module.exports = errorHandler;
