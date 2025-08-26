var { join } = require("node:path");

var getRegistrationFormPage = async (req, res, next) => res.sendFile(join(__dirname, "../../../../public/html/registration/registrationForm.html"));

module.exports = getRegistrationFormPage;
