import { Router } from "express";
import schema from "./joiSchemas/index.js";
import saveToken from "./controllers/saveToken.js";
import removeToken from "./controllers/removeToken.js";
import tokenValidator from "./controllers/tokenValidator.js";
import getWbTokenPage from "./controllers/getWbTokenPage.js";
import checkTokenExists from "./controllers/checkTokenExists.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getWbTokenPage);
router.get("/:userId", checkTokenExists);
router.post("/", tokenValidator, saveToken);
router.delete("/", joiSchemaValidator(schema.removeToken), removeToken);

export default router;
