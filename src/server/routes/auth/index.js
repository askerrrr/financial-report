import { Router } from "express";
import getAuthFormPage from "./controllers/getAuthFormPage.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import checkUserCredentials from "./controllers/checkUserCredentials.js";

import schemas from "./JoiSchemas/index.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAuthFormPage);

router.post("/", joiSchemaValidator(schemas.checkUserCredentials), checkUserCredentials);

export default router;
