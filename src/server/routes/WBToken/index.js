import { Router } from "express";
import schema from "./joiSchemas/index.js";
import saveToken from "./controllers/saveToken.js";
import removeToken from "./controllers/removeToken.js";
import getTokenData from "./controllers/getTokenData.js";
import tokenValidator from "./controllers/tokenValidator.js";
import getWbTokenPage from "./controllers/getWbTokenPage.js";
import checkTokenExists from "./controllers/checkTokenExists.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getWbTokenPage);
router.get("/:userId", getTokenData);
router.post("/", tokenValidator, saveToken);
router.get("/check-exist/:userId", checkTokenExists);
router.delete("/", joiSchemaValidator(schema.removeToken), removeToken);

export default router;
