import { join } from "node:path";

var getUserReportPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/userReportPage.html"));

export default getUserReportPage;
