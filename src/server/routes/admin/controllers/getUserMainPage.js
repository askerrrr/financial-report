import { join } from "node:path";

var getUserMainPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/userMainPage.html"));

export default getUserMainPage;
