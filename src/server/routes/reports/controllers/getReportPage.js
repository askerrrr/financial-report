import { join } from "node:path";

var getReportPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/report/index.html"));

export default getReportPage;
