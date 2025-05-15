var multer = require("multer");
var { DatabaseError } = require("../../customError/customError");

var errorHandler = async (e, req, res, next) => {
  console.log("e: ", e);

  if (e instanceof multer.MulterError) {
    console.log("MulterError ", e);
    return res.sendStatus(500);
  }

  if (e instanceof DatabaseError) {
    return res.sendStatus(500 );
  }

  console.log("AppError: ", e);
};

module.exports = errorHandler;
