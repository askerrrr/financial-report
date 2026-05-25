import { Router } from "express";
import saveToken from "./controllers/saveToken.js";
import removeToken from "./controllers/removeToken.js";
import tokenValidator from "./controllers/tokenValidator.js";
import checkTokenExists from "./controllers/checkTokenExists.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/:userId", checkTokenExists);
router.post("/", tokenValidator, saveToken);
router.delete("/", removeToken);

export default router;
