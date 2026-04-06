import { Router } from "express";
import saveToken from "./controllers/saveToken.js";
import checkTokenExists from "./controllers/checkTokenExists.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/", saveToken);

router.get("/exist/:userId", checkTokenExists);

export default router;
