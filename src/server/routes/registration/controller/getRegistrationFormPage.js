var { join } = require("node:path");

var getRegistrationFormPage = async (req, res, next) => res.sendFile(join(__dirname, "../../../../public/html/registration/index.html"));

module.exports = getRegistrationFormPage;
