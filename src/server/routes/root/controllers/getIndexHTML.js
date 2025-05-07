var { join } = require("node:path");

var getIndexHTML = async (req, res, next) => {
  try {
    return res.sendFile(join(__dirname, "../../../../public/html/index.html"));
  } catch (e) {
    next(e);
  }
};

module.exports = getIndexHTML;
