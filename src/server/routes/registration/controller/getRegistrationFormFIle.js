var { join } = require("node:path");

var getRegistrationFormFile = async (req, res, next) =>
  res.sendFile(
    join(
      __dirname,
      "../../../../public/html/registration/registrationForm.html"
    )
  );

module.exports = getRegistrationFormFile;
