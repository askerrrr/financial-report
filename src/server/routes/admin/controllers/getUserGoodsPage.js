import { join } from "node:path";

var getUserGoodsPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/userGoodsPage.html"));

export default getUserGoodsPage;
