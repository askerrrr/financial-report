import { join } from "node:path";

var getReportPage = async (req, res, next) =>
  res.sendFile(join(import.meta.dirname, "../../../../public/html/decodeReportWithoutRegistration/report.html"));

export default getReportPage;
