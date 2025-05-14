var multer = require("multer");
var { FileMimeTypeError } = require("../../customError/customError");

var errorHandler = async (e, req, res, next) => {
  if (e instanceof multer.MulterError) {
    console.log("MulterError ", e);
    return res.sendStatus(500);
  }

  if (e instanceof FileMimeTypeError) {
    return res.status(500).json({ msg: "Некорректный тип файла" });
  }

  console.log("AppError: ", e);
};

module.exports = errorHandler;
