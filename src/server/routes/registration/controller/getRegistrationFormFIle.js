var { join } = require("node:path");

var getRegistrationFormFile = async (req, res, next) => {
  try {
    return res.sendFile(
      join(
        __dirname,
        "../../../../public/html/registration/registrationForm.html"
      )
    );
  } catch (e) {
    next(e);
  }
};

module.exports = getRegistrationFormFile;
