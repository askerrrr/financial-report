import { join } from "node:path";

var getUserWbTokenPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/userWbTokenPage.html"));

export default getUserWbTokenPage;
