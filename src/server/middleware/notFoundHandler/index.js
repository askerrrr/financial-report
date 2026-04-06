import { join } from "node:path";

var notFoundHandler = async (req, res) => res.sendFile(join(import.meta.dirname, "../../../public/html/notFound.html"));

export default notFoundHandler;
