import { join } from "node:path";

var getAdminAuthPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/auth.html"));

export default getAdminAuthPage;
