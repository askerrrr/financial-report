import { join } from "node:path";

var getRegistrationFormPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/registration/index.html"));

export default getRegistrationFormPage;
