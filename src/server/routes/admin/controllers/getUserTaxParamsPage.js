import { join } from "node:path";

var getUserTaxParamsPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/admin/userTaxParamsPage.html"));

export default getUserTaxParamsPage;
