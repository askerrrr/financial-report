import { Router } from "express";
import saveToken from "./controllers/saveToken.js";
import checkTokenExists from "./controllers/checkTokenExists.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/:userId", checkTokenExists);
router.post("/", saveToken);


export default router;
