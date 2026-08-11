import { Router } from "express";
import removeUser from "./controllers/removeUser.js";
import getUserMainPage from "./controllers/getUserMainPage.js";
import getUserGoodsPage from "./controllers/getUserGoodsPage.js";
import getAdminMainPage from "./controllers/getAdminMainPage.js";
import getAdminAuthPage from "./controllers/getAdminAuthPage.js";
import getUserReportPage from "./controllers/getUserReportPage.js";
import checkAuthAdminData from "./controllers/checkAuthAdminData.js";
import getUserWbTokenPage from "./controllers/getUserWbTokenPage.js";
import getAdminMainPageData from "./controllers/getAdminMainPageData.js";
import getUserTaxParamsPage from "./controllers/getUserTaxParamsPage.js";

import * as joiSchemas from "./joiSchemas/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAdminMainPage);
router.get("/api", getAdminMainPageData);
router.get("/auth", getAdminAuthPage);
router.post("/", checkAuthAdminData);
router.delete("/", joiSchemaValidator(joiSchemas.removeUserSchema), removeUser);

router.get("/user/:userId", getUserMainPage);
router.get("/user/goods/:userId", getUserGoodsPage);
router.get("/user/wbtoken/:userId", getUserWbTokenPage);
router.get("/user/tax-params/:userId", getUserTaxParamsPage);
router.get("/user/:userId/report/:reportId", getUserReportPage);

export default router;
