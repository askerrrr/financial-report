var { readFile } = require("node:fs/promises");

var getImageToBase64 = async (filePath) => {
  try {
    var fileData = await readFile(filePath);

    var base64 = fileData.toString("base64");

    return base64;
  } catch (e) {
    if (e.code == "ENOENT") {
      return null;
    }
  }
};

module.exports = getImageToBase64;
