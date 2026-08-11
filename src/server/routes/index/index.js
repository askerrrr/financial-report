import { Router } from "express";
import logout from "./controllers/logout.js";
import getReports from "./controllers/getReports.js";
import getMainPage from "./controllers/getMainPage.js";
import getMainPageData from "./controllers/getMainPageData.js";

import * as joiSchemas from "./joiSchemas/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var needToValidateReqParams = true;

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getMainPage);
router.post("/logout", logout);
router.get("/api/:userId", joiSchemaValidator(joiSchemas.getMainPageDataSchema, needToValidateReqParams), getMainPageData);
router.post("/api/required-reports/", joiSchemaValidator(joiSchemas.getRequiredReportsSchema), getReports);

export default router;
