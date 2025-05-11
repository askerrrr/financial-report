var { join } = require("node:path");

var getAuthFormFile = async (req, res, next) => {
  try {
    return res.sendFile(
      join(__dirname, "../../../../public/html/auth/authForm.html")
    );
  } catch (e) {
    next(e);
  }
};

module.exports = getAuthFormFile;
