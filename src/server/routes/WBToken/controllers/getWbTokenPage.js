import { join } from "node:path";

var getWbTokenPage = async (req, res) => res.sendFile(join(import.meta.dirname, "../../../../public/html/wbToken/index.html"));

export default getWbTokenPage;
