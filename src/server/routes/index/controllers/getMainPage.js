import { join } from "node:path";

var getMainPage = async (req, res, next) => res.sendFile(join(import.meta.dirname, "../../../../public/html/index.html"));

export default getMainPage;
