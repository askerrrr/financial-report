import { join } from "node:path";

var getAdminMainPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/index.html"));

export default getAdminMainPage;
