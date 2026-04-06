import { join } from "node:path";

var getDecodeReportWithoutRegistrationPage = async (req, res, next) =>
  res.sendFile(join(import.meta.dirname, "../../../../public/html/decodeReportWithoutRegistration/index.html"));

export default getDecodeReportWithoutRegistrationPage;
