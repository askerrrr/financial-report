import { Router } from "express";
import removeUser from "./controllers/removeUser.js";
import getAdminMainPage from "./controllers/getAdminMainPage.js";
import getAdminAuthPage from "./controllers/getAdminAuthPage.js";
import checkAuthAdminData from "./controllers/checkAuthAdminData.js";
import getAdminMainPageData from "./controllers/getAdminMainPageData.js";
import getUserMainPage from "./controllers/getUserMainPage.js";

import * as joiSchemas from "./joiSchemas/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAdminMainPage);
router.get("/api", getAdminMainPageData);
router.get("/auth", getAdminAuthPage);
router.post("/", checkAuthAdminData);
router.delete("/", joiSchemaValidator(joiSchemas.removeUserSchema), removeUser);

router.get("/user/:userId", getUserMainPage);

export default router;
