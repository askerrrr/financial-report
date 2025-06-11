var { readFile } = require("node:fs/promises");

var getImageToBase64 = async (filePath) => {
  var fileData = await readFile(filePath);

  var base64 = fileData.toString("base64");

  return base64;
};

module.exports = getImageToBase64;
