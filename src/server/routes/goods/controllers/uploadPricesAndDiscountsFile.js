var fileParser = require("../services/fileParser");

var uploadPricesAndDiscountsFile = async (req, res, next) => {
  var fileBuffer = req.file.buffer;
  await fileParser(fileBuffer);
};

module.exports = uploadPricesAndDiscountsFile;
